import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# 1. Load the data
df = pd.read_csv("C:\\Users\\archa\\.vscode\\Capstone project 2.0\\Capstone_project\\backend\\models\\Malware dataset.csv")  # use your file path

# 2. Drop non-informative columns
df = df.drop(columns=["hash", "millisecond"])

# 3. Encode the label
label_encoder = LabelEncoder()
df["classification"] = label_encoder.fit_transform(df["classification"])  # malware=1, benign=0

# 4. Split into features and label
X = df.drop(columns=["classification"])
y = df["classification"]

# 5. Feature scaling (optional but recommended for some models)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 6. Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# 7. Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 8. Predict and evaluate
y_pred = model.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

import matplotlib.pyplot as plt

importances = model.feature_importances_
feature_names = X.columns

# Sort features by importance
indices = importances.argsort()[::-1]

plt.figure(figsize=(12, 6))
plt.title("Feature Importances")
plt.bar(range(X.shape[1]), importances[indices], align='center')
plt.xticks(range(X.shape[1]), [feature_names[i] for i in indices], rotation=90)
plt.tight_layout()
plt.show()

import joblib

# Save model to file
joblib.dump(model, 'malware_rf_model.joblib')

# Optionally save the scaler too, if used
joblib.dump(scaler, 'feature_scaler.joblib')
