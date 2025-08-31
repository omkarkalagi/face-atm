# face_utils.py
import os
import cv2
import numpy as np
import pickle
import mediapipe as mp

# Paths - adjust if filenames differ
OUTPUT_DIR = "output"
EMBEDDER_MODEL = "nn4.small2.v1.t7"   # if your embedder is named differently, change
CAFFE_PROTO = "deploy.prototxt"
CAFFE_MODEL = "res10_300x300_ssd_iter_140000.caffemodel"

mp_fd = mp.solutions.face_detection.FaceDetection(min_detection_confidence=0.5)

def load_models():
    embedder = None
    recognizer = None
    le = None
    if os.path.exists(EMBEDDER_MODEL):
        embedder = cv2.dnn.readNetFromTorch(EMBEDDER_MODEL)
    rec_path = os.path.join(OUTPUT_DIR, "recognizer.pickle")
    le_path = os.path.join(OUTPUT_DIR, "le.pickle")
    if os.path.exists(rec_path) and os.path.exists(le_path):
        recognizer = pickle.loads(open(rec_path, "rb").read())
        le = pickle.loads(open(le_path, "rb").read())
    return embedder, recognizer, le

def detect_faces_mediapipe(frame):
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = mp_fd.process(rgb)
    boxes = []
    (h,w) = frame.shape[:2]
    if results.detections:
        for det in results.detections:
            bbox = det.location_data.relative_bounding_box
            x = max(0, int(bbox.xmin * w))
            y = max(0, int(bbox.ymin * h))
            fw = int(bbox.width * w)
            fh = int(bbox.height * h)
            x2 = min(w, x + fw)
            y2 = min(h, y + fh)
            boxes.append((x,y,x2,y2))
    return boxes

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
    boxes = detect_faces_mediapipe(frame)
    if not boxes:
        return {"name":"unknown","proba":0.0}
    # Take largest face
    boxes = sorted(boxes, key=lambda b: (b[2]-b[0])*(b[3]-b[1]), reverse=True)
    startX,startY,endX,endY = boxes[0]
    face = frame[startY:endY, startX:endX]
    (fH,fW) = face.shape[:2]
    if fH < 20 or fW < 20:
        return {"name":"unknown","proba":0.0}
    if embedder is None or recognizer is None or le is None:
        return {"name":"unknown","proba":0.0}
    vec = extract_embedding(embedder, face)
    preds = recognizer.predict_proba([vec])[0]
    print('Face verification: prediction probabilities:', preds)
    print('Face verification: label mapping:', le.classes_)
    j = np.argmax(preds)
    proba = float(preds[j])
    name = le.classes_[j]
    if name == 'unknown' or proba < min_proba:
        return {"name":"unknown","proba":proba}
    return {"name":str(name),"proba":proba}

def recognize_from_image_b64(b64data, embedder, recognizer, le, min_proba=0.5):
    import base64
    if not b64data:
        return {"error":"no image"}
    if b64data.startswith("data:"):
        b64data = b64data.split(",",1)[1]
    try:
        imgdata = base64.b64decode(b64data)
    except Exception as e:
        return {"error":f"invalid base64: {e}"}
    nparr = np.frombuffer(imgdata, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if frame is None:
        return {"error":"invalid image"}
    return recognize_from_frame(frame, embedder, recognizer, le, min_proba=min_proba)
