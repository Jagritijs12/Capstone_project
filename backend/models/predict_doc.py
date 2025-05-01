import pandas as pd
import joblib
import sys
import os
import json

# -------- Load saved model and scaler --------
model = joblib.load("./models/malware_rf_model.joblib")
scaler = joblib.load("./models/feature_scaler.joblib")

# -------- Load and parse input file --------
def load_document(filepath):
    if filepath.endswith(".csv"):
        df = pd.read_csv(filepath)
    elif filepath.endswith(".txt"):
        df = pd.read_csv(filepath, delimiter=",")  # adjust delimiter if needed
    else:
        raise ValueError("Unsupported file type. Use CSV or TXT with structured data.")
    return df

# -------- Preprocess --------
def preprocess(df):
    if "hash" in df.columns:
        df = df.drop(columns=["hash"])
    if "millisecond" in df.columns:
        df = df.drop(columns=["millisecond"])
    if "classification" in df.columns:
        df = df.drop(columns=["classification"])
    X_scaled = scaler.transform(df)
    return X_scaled

# -------- Run inference --------
def predict(filepath):
    df = load_document(filepath)
    X_scaled = preprocess(df)
    preds = model.predict(X_scaled)
    pred_labels = ["benign" if p == 0 else "malware" for p in preds]
    
    # Return list of predictions
    return pred_labels

# -------- Main entry point --------
if __name__ == "__main__":
    try:
        if len(sys.argv) != 2:
            raise ValueError("Usage: python predict_doc.py <path_to_input_document>")

        file_path = sys.argv[1]
        if not os.path.isfile(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        results = predict(file_path)
        print(json.dumps(results))  # Output as JSON list

    except Exception as e:
        error_response = {"error": str(e)}
        print(json.dumps(error_response))
        sys.exit(1)
