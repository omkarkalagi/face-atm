# app.py
import os
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
from storage import read_accounts, write_accounts, log_transaction, get_history
from face_utils import load_models, recognize_from_image_b64
from train import train_model

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 512 * 1024 * 1024  # 512 MB
import secrets
app.secret_key = os.environ.get("FLASK_SECRET_KEY", secrets.token_hex(16))

# initial load
embedder, recognizer, le = load_models()

@app.route("/")
def home():
    return render_template("index.html")



# Login: Step 1 - Face Verification (via /verify and /api/verify)
@app.route("/login", methods=["GET"])
def login():
    return render_template("verify.html")

@app.route("/api/verify", methods=["POST"])
def api_verify():
    global embedder, recognizer, le
    try:
        data = request.json
        img_b64 = data.get("image")
        result = recognize_from_image_b64(img_b64, embedder, recognizer, le)
        if result.get("name") != "unknown":
            session["user_id"] = result["name"]
        return jsonify(result)
    except Exception as e:
        return jsonify({"ok": False, "error": "No face matched or server error."}), 200

# Login: Step 2 - PIN/Password Verification
@app.route("/login_pin", methods=["GET", "POST"])
def login_pin():
    user_id = session.get("user_id")
    print('login_pin route called, user_id:', user_id)
    if not user_id:
        return redirect(url_for("login"))
    if request.method == "GET":
        return render_template("login_pin.html", user_id=user_id)
    pin = request.form.get("pin")
    print('PIN received:', repr(pin))
    df = read_accounts()
    row = df[df["unique_id"].astype(str) == str(user_id)]
    expected_pin = str(row.iloc[0]["password"]) if not row.empty else None
    print('Expected PIN:', repr(expected_pin))
    if row.empty or expected_pin != pin:
        flash("Invalid PIN/password", "danger")
        print('Invalid PIN/password for user_id:', user_id)
        return render_template("login_pin.html", user_id=user_id)
    session["logged_in"] = True
    return redirect(url_for("dashboard", user_id=user_id))

    # ...existing code...

@app.route("/dashboard/<user_id>")
def dashboard(user_id):
    if not session.get("logged_in") or session.get("user_id") != user_id:
        flash("Please login first.", "danger")
        return redirect(url_for("home"))
    df = read_accounts()
    row = df[df["unique_id"].astype(str) == str(user_id)]
    if row.empty:
        flash("Account not found", "danger")
        return redirect(url_for("home"))
    acc_no = row.iloc[0]["account_number"]
    name = row.iloc[0]["name"]
    bal = int(row.iloc[0]["account_balance"])
    history = get_history(user_id)
    return render_template("dashboard.html", user_id=user_id, acc_no=acc_no, name=name, bal=bal, history=history)

@app.route("/deposit/<user_id>", methods=["POST"])
def deposit(user_id):
    if not session.get("logged_in") or session.get("user_id") != user_id:
        flash("Please login first.", "danger")
        return redirect(url_for("home"))
    amt = int(request.form.get("amount",0))
    if amt <= 0:
        flash("Enter valid amount", "danger")
        return redirect(url_for("dashboard", user_id=user_id))
    df = read_accounts()
    df["account_balance"] = df["account_balance"].astype(int)
    df.loc[df["unique_id"].astype(str) == str(user_id), "account_balance"] += amt
    write_accounts(df)
    log_transaction(user_id, "Deposit", amt)
    flash(f"₹{amt} deposited", "success")
    return redirect(url_for("dashboard", user_id=user_id))

@app.route("/withdraw/<user_id>", methods=["POST"])
def withdraw(user_id):
    if not session.get("logged_in") or session.get("user_id") != user_id:
        flash("Please login first.", "danger")
        return redirect(url_for("home"))
    amt = int(request.form.get("amount",0))
    if amt <= 0:
        flash("Enter valid amount", "danger")
        return redirect(url_for("dashboard", user_id=user_id))
    df = read_accounts()
    df["account_balance"] = df["account_balance"].astype(int)
    bal_row = df.loc[df["unique_id"].astype(str) == str(user_id), "account_balance"]
    if bal_row.empty:
        flash("Account not found", "danger")
        return redirect(url_for("dashboard", user_id=user_id))
    bal = int(bal_row.values[0])
    if amt > bal:
        flash("Insufficient balance", "danger")
        return redirect(url_for("dashboard", user_id=user_id))
    df.loc[df["unique_id"].astype(str) == str(user_id), "account_balance"] = bal - amt
    write_accounts(df)
    log_transaction(user_id, "Withdraw", amt)
    flash(f"₹{amt} withdrawn", "success")
    return redirect(url_for("dashboard", user_id=user_id))
# Logout
@app.route("/logout")
def logout():
    session.clear()
    flash("Logged out.", "info")
    return redirect(url_for("home"))


@app.route("/train", methods=["POST"])
def train_route():
    try:
        res = train_model()
        global embedder, recognizer, le
        embedder, recognizer, le = load_models()
        return jsonify({"ok":True, "trained":res.get("trained",0)})
    except Exception as e:
        return jsonify({"ok":False, "error":str(e)}), 500

# Registration page
@app.route("/register", methods=["GET", "POST"])
def register():
    print('Register route called')
    if request.method == "GET":
        return render_template("register.html")
    print('Form data received')
    name = request.form.get("name")
    acc_no = request.form.get("acc_no") or str(secrets.randbelow(1000000000))
    password = request.form.get("password")
    images_json = request.form.get("images")
    # validate and parse deposit safely
    deposit_raw = request.form.get("deposit", "0")
    try:
        deposit = int(deposit_raw)
    except Exception:
        deposit = 0
    images = []
    try:
        if images_json:
            import base64, uuid, json
            images = json.loads(images_json)
            if not isinstance(images, list):
                images = []
        print('Images loaded:', len(images))
        # Password validation: must be 4 digits
        if not (password and password.isdigit() and len(password) == 4):
            flash("Password must be exactly 4 digits.", "danger")
            return redirect(url_for("register"))
        if not (name and acc_no and deposit > 0 and password and images and len(images) >= 5):
            print('Validation failed')
            flash("All fields required and at least 5 face images", "danger")
            return redirect(url_for("register"))
        user_dir = os.path.join("dataset", acc_no)
        os.makedirs(user_dir, exist_ok=True)
        for idx, b64img in enumerate(images):
            if b64img.startswith("data:"):
                b64img = b64img.split(",",1)[1]
            imgdata = base64.b64decode(b64img)
            fname = f"face_{idx+1}_{uuid.uuid4().hex[:8]}.jpg"
            with open(os.path.join(user_dir, fname), "wb") as f:
                f.write(imgdata)
        print('Images saved')
        # Save account before training
        import pandas as pd
        df = read_accounts()
        new_row = {"unique_id": acc_no, "account_number": acc_no, "name": name, "bank": "FaceATM", "password": password, "account_balance": deposit}
        df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
        print('Saving account:', new_row)
        write_accounts(df)
        print('Account written to CSV')
        # Train model for this user
        try:
            train_model()
        except Exception as e:
            print('Training failed:', e)
            flash(f"Account saved, but training failed: {e}", "warning")
            return redirect(url_for("home"))
        flash("Account created! You can now login.", "success")
        return redirect(url_for("home"))
    except Exception as e:
        print('Registration failed:', e)
        flash(f"Registration failed: {e}", "danger")
        return redirect(url_for("register"))

@app.route("/enroll", methods=["GET","POST"])
def enroll():
    if request.method == "GET":
        return render_template("enroll.html")
    user_id = request.form.get("user_id")
    if not user_id:
        flash("Enter user id", "danger")
        return redirect(url_for("enroll"))
    files = request.files.getlist("images")
    if not files:
        flash("Upload images", "danger")
        return redirect(url_for("enroll"))
    user_dir = os.path.join("dataset", str(user_id))
    os.makedirs(user_dir, exist_ok=True)
    count = 0
    for f in files:
        save_path = os.path.join(user_dir, f.filename)
        f.save(save_path)
        count += 1
    flash(f"Saved {count} images for user {user_id}. Now click Train.", "success")
    return redirect(url_for("enroll"))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
