# face_utils.py - Simplified version without external dependencies
import os
import cv2
import numpy as np
import pickle

# Try to import optional dependencies, but don't fail if not available
OPENCV_AVAILABLE = True
try:
    import cv2
except ImportError:
    OPENCV_AVAILABLE = False
    print("⚠️  OpenCV not available")

# Mediapipe and face-recognition are optional
MEDIAPIPE_AVAILABLE = False
FACE_RECOGNITION_AVAILABLE = False

# Paths - adjust if filenames differ
OUTPUT_DIR = "output"
EMBEDDER_MODEL = "nn4.small2.v1.t7"   # if your embedder is named differently, change
CAFFE_PROTO = "deploy.prototxt"
CAFFE_MODEL = "res10_300x300_ssd_iter_140000.caffemodel"

print("🔧 Face recognition modules status:")
print(f"   OpenCV: {'✅ Available' if OPENCV_AVAILABLE else '❌ Not available'}")
print(f"   Mediapipe: {'✅ Available' if MEDIAPIPE_AVAILABLE else '❌ Not available'}")
print(f"   Face Recognition: {'✅ Available' if FACE_RECOGNITION_AVAILABLE else '❌ Not available'}")

# Initialize components only if available
mp_fd = None
face_cascade = None
if OPENCV_AVAILABLE:
    cascade_path = os.path.join(cv2.data.haarcascades, "haarcascade_frontalface_default.xml")
    if os.path.exists(cascade_path):
        face_cascade = cv2.CascadeClassifier(cascade_path)
        if face_cascade.empty():
            face_cascade = None
            print("⚠️  Failed to load Haar cascade for face detection")
    else:
        print(f"⚠️  Haar cascade file not found at {cascade_path}")

def load_models():
    """Load face recognition models if available"""
    embedder = None
    recognizer = None
    le = None

    if not OPENCV_AVAILABLE:
        print("⚠️  Cannot load models - OpenCV not available")
        return None, None, None

    try:
        if os.path.exists(EMBEDDER_MODEL):
            embedder = cv2.dnn.readNetFromTorch(EMBEDDER_MODEL)
            print(f"✅ Loaded embedder model: {EMBEDDER_MODEL}")
    except Exception as e:
        print(f"⚠️  Could not load embedder: {e}")

    rec_path = os.path.join(OUTPUT_DIR, "recognizer.pickle")
    le_path = os.path.join(OUTPUT_DIR, "le.pickle")

    try:
        if os.path.exists(rec_path) and os.path.exists(le_path):
            recognizer = pickle.loads(open(rec_path, "rb").read())
            le = pickle.loads(open(le_path, "rb").read())
            print("✅ Loaded trained recognition models")
    except Exception as e:
        print(f"⚠️  Could not load recognition models: {e}")

    return embedder, recognizer, le

def detect_faces(frame):
    """Detect faces using available backends (mediapipe preferred, otherwise Haar cascade)."""
    if not OPENCV_AVAILABLE:
        print("❌ Cannot detect faces - OpenCV not available")
        return []

    # Prefer Mediapipe if it is available
    if MEDIAPIPE_AVAILABLE and mp_fd is not None:
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = mp_fd.process(rgb)
        boxes = []
        (h, w) = frame.shape[:2]
        if results and results.detections:
            for det in results.detections:
                bbox = det.location_data.relative_bounding_box
                x = max(0, int(bbox.xmin * w))
                y = max(0, int(bbox.ymin * h))
                fw = int(bbox.width * w)
                fh = int(bbox.height * h)
                x2 = min(w, x + fw)
                y2 = min(h, y + fh)
                boxes.append((x, y, x2, y2))
        return boxes

    # Fallback to Haar cascade
    if face_cascade is not None:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rects = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        boxes = []
        for (x, y, w, h) in rects:
            boxes.append((x, y, x + w, y + h))
        return boxes

    print("⚠️  No face detection backend available")
    return []

def extract_embedding(embedder, face):
    if face is None:
        print('extract_embedding: face is None')
        return None
    if not isinstance(face, np.ndarray):
        print('extract_embedding: face is not a numpy array, type:', type(face))
        return None
    print('extract_embedding: face shape:', face.shape, 'dtype:', face.dtype)
    blob = cv2.dnn.blobFromImage(face, 1.0/255, (96,96), (0,0,0), swapRB=True, crop=False)
    embedder.setInput(blob)
    vec = embedder.forward()
    return vec.flatten()

def recognize_from_frame(frame, embedder, recognizer, le, min_proba=0.5):
    """
    Input: BGR frame (numpy)
    Output: dict {name, proba} or {'name':'unknown'}
    """
    if not OPENCV_AVAILABLE:
        return {"name": "unknown", "proba": 0.0, "error": "OpenCV not available"}

    boxes = detect_faces(frame)
    if not boxes:
        return {"name": "unknown", "proba": 0.0, "error": "No faces detected"}

    # Take largest face
    boxes = sorted(boxes, key=lambda b: (b[2]-b[0])*(b[3]-b[1]), reverse=True)
    startX, startY, endX, endY = boxes[0]
    face = frame[startY:endY, startX:endX]
    (fH, fW) = face.shape[:2]

    if fH < 20 or fW < 20:
        return {"name": "unknown", "proba": 0.0, "error": "Face too small"}

    if embedder is None or recognizer is None or le is None:
        return {"name": "unknown", "proba": 0.0, "error": "Models not loaded"}

    try:
        vec = extract_embedding(embedder, face)
        if vec is None:
            return {"name": "unknown", "proba": 0.0, "error": "Could not extract embedding"}

        preds = recognizer.predict_proba([vec])[0]
        print('Face verification: prediction probabilities:', preds)
        print('Face verification: label mapping:', le.classes_)
        j = np.argmax(preds)
        proba = float(preds[j])
        name = le.classes_[j]

        if name == 'unknown' or proba < min_proba:
            return {"name": "unknown", "proba": proba, "error": "Low confidence or unknown"}
        return {"name": str(name), "proba": proba}

    except Exception as e:
        return {"name": "unknown", "proba": 0.0, "error": f"Recognition error: {str(e)}"}

def recognize_from_image_b64(b64data, embedder, recognizer, le, min_proba=0.5):
    """Process base64 image data for face recognition"""
    if not OPENCV_AVAILABLE:
        return {"error": "OpenCV not available"}

    import base64
    if not b64data:
        return {"error":"no image"}
    if b64data.startswith("data:"):
        b64data = b64data.split(",",1)[1]
    try:
        imgdata = base64.b64decode(b64data)
    except Exception as e:
        return {"error":f"invalid base64: {e}"}

    try:
        nparr = np.frombuffer(imgdata, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if frame is None:
            return {"error":"invalid image"}
        return recognize_from_frame(frame, embedder, recognizer, le, min_proba=min_proba)
    except Exception as e:
        return {"error": f"Image processing error: {str(e)}"}
