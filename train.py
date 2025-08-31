# train.py
import os
import cv2
import pickle
import mediapipe as mp
from imutils import paths
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC

DATASET_DIR = "dataset"
OUTPUT_DIR = "output"
EMBEDDER_MODEL = "nn4.small2.v1.t7"

def train_model():
    if not os.path.exists(EMBEDDER_MODEL):
        raise FileNotFoundError(f"Missing embedder file: {EMBEDDER_MODEL}")
    embedder = cv2.dnn.readNetFromTorch(EMBEDDER_MODEL)
    imagePaths = list(paths.list_images(DATASET_DIR))
    if not imagePaths:
        raise FileNotFoundError("No images in dataset to train.")
    mp_fd = mp.solutions.face_detection.FaceDetection(min_detection_confidence=0.5)
    knownEmbeddings = []
    knownNames = []
    total = 0
    for imagePath in imagePaths:
        name = imagePath.split(os.path.sep)[-2]
        image = cv2.imread(imagePath)
        if image is None:
            continue
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = mp_fd.process(rgb)
        if results.detections:
            for det in results.detections:
                bbox = det.location_data.relative_bounding_box
                ih, iw, _ = image.shape
                x = max(0, int(bbox.xmin * iw))
                y = max(0, int(bbox.ymin * ih))
                w = int(bbox.width * iw)
                h = int(bbox.height * ih)
                x2 = min(iw, x + w)
                y2 = min(ih, y + h)
                face = image[y:y2, x:x2]
                if face.size == 0:
                    continue
                (fH, fW) = face.shape[:2]
                if fW < 20 or fH < 20:
                    continue
                faceBlob = cv2.dnn.blobFromImage(face, 1.0/255, (96,96), (0,0,0), swapRB=True, crop=False)
                embedder.setInput(faceBlob)
                vec = embedder.forward()
                knownNames.append(name)
                knownEmbeddings.append(vec.flatten())
                total += 1
    if total == 0:
        raise ValueError("No valid faces found.")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    data = {"embeddings": knownEmbeddings, "names": knownNames}
    with open(os.path.join(OUTPUT_DIR, "embeddings.pickle"), "wb") as f:
        f.write(pickle.dumps(data))
    le = LabelEncoder()
    labels = le.fit_transform(knownNames)
    recognizer = SVC(C=1.0, kernel="linear", probability=True)
    recognizer.fit(knownEmbeddings, labels)
    with open(os.path.join(OUTPUT_DIR, "recognizer.pickle"), "wb") as f:
        f.write(pickle.dumps(recognizer))
    with open(os.path.join(OUTPUT_DIR, "le.pickle"), "wb") as f:
        f.write(pickle.dumps(le))
    return {"trained": total}

if __name__ == "__main__":
    print("Training... this may take a while")
    res = train_model()
    print("Trained:", res)
