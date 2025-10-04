# ⚡ FaceATM - Quick Start Guide

**Get started in 5 minutes!**

---

## 🚀 For First-Time Users

### 1. Install Dependencies (One Time)

```bash
# Navigate to project
cd c:\Projects\face_atm

# Install Python packages
pip install -r requirements.txt

# Install Node.js packages
cd web_app
npm install
cd ..
```

### 2. Start Application

```bash
# Single command starts everything!
python app.py
```

**You'll see:**
```
Starting FaceATM - Both Frontend and Backend servers...
Frontend: http://localhost:3000
Backend: http://localhost:5000
Both servers starting...
```

### 3. Open Browser

Go to: **http://localhost:3000**

---

## 📝 CRITICAL: 3-Step Setup (FIRST TIME ONLY)

### ⭐ STEP 1: Register (5 minutes)

1. Click **"Register"** in menu
2. Fill the form:
   - Name: Your full name
   - Account Number: Any unique number (or leave blank)
   - Initial Deposit: Any amount (e.g., 1000)
   - PIN: 4-digit number (e.g., 1234)
3. Click **"Start Camera"**
4. Take **5-10 photos**:
   - Look straight
   - Turn left slightly
   - Turn right slightly
   - Look up slightly
   - Look down slightly
5. Click **"Submit Registration"**
6. Wait for "Success!" message

✅ **Done!** Your face images are saved.

---

### ⭐ STEP 2: Train Model (1 minute)

**🔴 YOU MUST DO THIS BEFORE LOGIN!**

1. Click **"Train"** in menu (or go to http://localhost:3000/train)
2. Read the page (explains what training does)
3. Click **"Start Training"** button
4. Wait 30-60 seconds
5. You'll see: "✅ Training completed successfully!"

✅ **Done!** AI learned your face.

---

### ⭐ STEP 3: Login (30 seconds)

1. Click **"Login"** in menu
2. Click **"Enable Camera"**
3. Look at the camera (smile! 😊)
4. System recognizes you automatically
5. Enter your 4-digit PIN
6. Click **"Login"**

✅ **Welcome!** You're in your dashboard!

---

## 💰 What Can You Do Now?

### In Your Dashboard:

**Deposit Money:**
1. Click "Deposit"
2. Enter amount
3. Confirm
4. ✅ Balance updated instantly

**Withdraw Money:**
1. Click "Withdraw"
2. Enter amount
3. Confirm
4. ✅ Balance updated instantly

**View History:**
- Scroll down to see all transactions
- Date, type, and amount shown

---

## 🔄 Daily Use (After Setup)

Every time you want to use FaceATM:

```bash
# 1. Start servers
python app.py

# 2. Open browser
# Go to http://localhost:3000

# 3. Login with your face
# Click Login → Enable Camera → Enter PIN

# 4. Start banking!
```

---

## ❓ Common Questions

### Q: Can I skip training?
**A:** NO! You MUST train after registration before you can login.

### Q: What if face recognition doesn't work?
**A:** 
- Ensure good lighting
- Remove glasses/hat (if you wore them during registration)
- Try retraining your model (/train page)

### Q: I forgot my PIN!
**A:** Contact support or create a new account with different account number.

### Q: Can multiple people use this?
**A:** Yes! Each person should:
1. Register with different account number
2. Train their own model
3. Login with their face

---

## 🆘 Troubleshooting

### Problem: "Cannot connect to backend"

```bash
# Make sure both servers are running
# Check terminal output, should see:
# "Frontend: http://localhost:3000"
# "Backend: http://localhost:5000"

# If not, restart:
python app.py
```

### Problem: "Camera not working"

1. Allow camera permissions in browser
2. Check if other apps are using camera
3. Try different browser (Chrome/Firefox recommended)

### Problem: "Training failed"

1. Make sure you registered first
2. Check if you captured at least 5 images
3. Try registration again

### Problem: "Model not loaded"

**Solution:**
```bash
# This is normal! Just go to /train and click "Start Training"
# The app runs fine, face recognition will work after training
```

---

## 🎯 Features Overview

### What You Can Do:

1. **Register** - Create account with face
2. **Train** - Teach AI your face
3. **Login** - Use face + PIN
4. **Deposit** - Add money
5. **Withdraw** - Take money
6. **View History** - See transactions
7. **Check Balance** - Real-time balance

### Pages to Explore:

- **Home** - Overview and features
- **About** - Learn about FaceATM
- **Features** - Detailed capabilities
- **Services** - All available services
- **Security** - How we protect you
- **FAQ** - Common questions answered
- **Contact** - Get in touch

---

## 📱 Mobile Use

FaceATM works on phones too!

**On your phone:**
1. Connect to same WiFi as computer
2. Open: `http://YOUR_COMPUTER_IP:3000`
3. Use normally with phone camera

**Find your IP:**
```bash
# Windows
ipconfig

# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

---

## 🚀 Deploy to Internet

Want others to use it online?

1. Read: `DEPLOYMENT_GUIDE.md`
2. Push code to GitHub
3. Deploy frontend to Vercel (free!)
4. Deploy backend to Railway (free!)
5. Share your URL!

**Takes about 15 minutes!**

---

## 💡 Tips

1. **Good lighting** = Better recognition
2. **5+ face images** = More accurate
3. **Train after registration** = Required!
4. **Different angles** = Best results
5. **Keep PIN safe** = Extra security

---

## 📞 Need Help?

**Developer**: Omkar Kalagi  
**Email**: omkardigambar4@gmail.com  
**Phone**: +91 7624828106

**Check these files:**
- `README.md` - Full documentation
- `DEPLOYMENT_GUIDE.md` - Deploy online
- `PROJECT_SUMMARY.md` - Project overview
- `FAQ page` - In app at /faq

---

<div align="center">

## 🎉 Enjoy FaceATM!

**Banking made secure, simple, and contactless**

Made with ❤️ by **Kalagi Group of Companies**  
Designed by **Omkar Kalagi**

### ⭐ Remember: Register → Train → Login ⭐

</div>
