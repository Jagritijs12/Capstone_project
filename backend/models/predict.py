import sys
import joblib
import pandas as pd
import json

def log(msg):
    print(msg, file=sys.stderr)

# Load model, scaler, and label encoders
try:
    model = joblib.load('./models/rf_model.pkl')
    scaler = joblib.load('./models/scaler.pkl')
    label_encoders = joblib.load('./models/label_encoders.pkl')
    log("Model, scaler, and encoders loaded successfully.")
except Exception as e:
    print(json.dumps({"error": f"Model loading failed: {str(e)}"}))
    sys.exit(1)

# Load CSV
csv_path = sys.argv[1]
try:
    df = pd.read_csv(csv_path)
    log("CSV loaded successfully.")
except pd.errors.ParserError as e:
    print(json.dumps({"error": f"CSV parsing error: {str(e)}"}))
    sys.exit(1)
except Exception as e:
    print(json.dumps({"error": f"Failed to load CSV: {str(e)}"}))
    sys.exit(1)

# Encode categorical columns
try:
    for col in ['Activity_Type', 'Action']:
        le = label_encoders[col]
        df[col] = df[col].apply(lambda x: le.transform([x])[0] if x in le.classes_ else -1)
        log(f"Encoded column '{col}'.")
except Exception as e:
    print(json.dumps({"error": f"Encoding failed: {str(e)}"}))
    sys.exit(1)

# Handle timestamp
try:
    df['Timestamp'] = pd.to_datetime(df['Timestamp'])
    df['Hour'] = df['Timestamp'].dt.hour
    df['Day'] = df['Timestamp'].dt.day
    df.drop(columns=['Timestamp'], inplace=True)
    log("Timestamp features processed.")
except Exception as e:
    print(json.dumps({"error": f"Timestamp processing failed: {str(e)}"}))
    sys.exit(1)

# Drop unused columns
drop_cols = ['User_ID', 'IP_Address', 'File_Name', 'Resource_Accessed', 'Anomaly_Type', 'Label']
df.drop(columns=[col for col in drop_cols if col in df.columns], inplace=True, errors='ignore')
log("Dropped unused columns.")

# Scale and predict
try:
    X_scaled = scaler.transform(df)
    preds = model.predict(X_scaled)
    log("Predictions made.")
except Exception as e:
    print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
    sys.exit(1)

# Add predictions
try:
    original_df = pd.read_csv(csv_path)
    original_df['Prediction'] = preds
    anomalies = original_df[original_df['Prediction'] == 1]
    print(anomalies.to_json(orient="records"))
except Exception as e:
    print(json.dumps({"error": f"Output generation failed: {str(e)}"}))
    sys.exit(1)
