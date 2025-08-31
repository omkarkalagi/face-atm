# storage.py
import os
import pandas as pd
from datetime import datetime

ACCOUNTS_CSV = "bank_details.csv"
TXN_CSV = "transactions.csv"

def read_accounts():
    if not os.path.exists(ACCOUNTS_CSV):
        return pd.DataFrame(columns=["unique_id","account_number","name","bank","password","account_balance"])
    df = pd.read_csv(ACCOUNTS_CSV)
    if "account_balance" in df.columns:
        df["account_balance"] = pd.to_numeric(df["account_balance"], errors="coerce").fillna(0).astype(int)
    return df

def write_accounts(df):
    df.to_csv(ACCOUNTS_CSV, index=False)

def log_transaction(user_id, txn_type, amount):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = {"user_id": user_id, "type": txn_type, "amount": amount, "timestamp": ts}
    if not os.path.exists(TXN_CSV):
        pd.DataFrame([entry]).to_csv(TXN_CSV, index=False)
    else:
        df = pd.read_csv(TXN_CSV)
        df = pd.concat([df, pd.DataFrame([entry])], ignore_index=True)
        df.to_csv(TXN_CSV, index=False)

def get_history(user_id):
    if not os.path.exists(TXN_CSV):
        return []
    df = pd.read_csv(TXN_CSV)
    df = df[df["user_id"].astype(str) == str(user_id)]
    return [f"{row['timestamp']}: {row['type']} ₹{row['amount']}" for _, row in df.iterrows()]
