1. Create a folder face_atm_flask and add these files/folders exactly.
2. Install dependencies:
   pip install -r requirements.txt
   (If camera fails, install opencv-python instead of opencv-python-headless)

3. Make sure you have:
   - dataset/ (for enroll images)
   - output/ (model outputs)
   - nn4.small2.v1.t7 or your embedder model file in project root (or change EMBEDDER_MODEL constant)

4. Run:
   python app.py
   Open http://localhost:5000

5. Use Enroll -> upload images (user_id is folder name), then Train (from Home page) to build models.
   After training, go to Verify -> allow camera -> Capture & Verify -> if matched click Open Dashboard.

Notes:
- Training can take time depending on image count.
- For production, secure secret keys, use HTTPS, and implement sessions & auth properly.
