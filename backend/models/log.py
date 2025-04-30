import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv("C:\\Users\\archa\\.vscode\\Capstone project 2.0\\Capstone_project\\backend\\models\\cybercrime_forensic_dataset.csv")

# Fill missing numeric values
df.fillna(df.mean(numeric_only=True), inplace=True)
df.dropna(subset=['Timestamp', 'Label'], inplace=True)

# Encode categorical columns
categorical_cols = ['Activity_Type', 'Action']
label_encoders = {}
for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Timestamp features
df['Timestamp'] = pd.to_datetime(df['Timestamp'])
df['Hour'] = df['Timestamp'].dt.hour
df['Day'] = df['Timestamp'].dt.day
df.drop(columns=['Timestamp'], inplace=True)

# Drop unnecessary columns
df.drop(columns=['User_ID', 'IP_Address', 'File_Name', 'Resource_Accessed','Anomaly_Type'], inplace=True)

# Encode target
df['Label_Encoded'] = df['Label'].apply(lambda x: 1 if x == 'Suspicious' else 0)

# Prepare features and target
X = df.drop(columns=['Label', 'Label_Encoded'])
y = df['Label_Encoded']

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Apply SMOTE
from imblearn.over_sampling import SMOTE
sm = SMOTE(random_state=42)
X_resampled, y_resampled = sm.fit_resample(X_scaled, y)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# Train Random Forest
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Predict
preds_binary = model.predict(X_test)

# Evaluation
print("Confusion Matrix:")
print(confusion_matrix(y_test, preds_binary))
print("\nClassification Report:")
print(classification_report(y_test, preds_binary))

# Plot confusion matrix
sns.heatmap(confusion_matrix(y_test, preds_binary), annot=True, fmt="d", cmap="Blues")
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

import joblib
joblib.dump(model, 'rf_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(label_encoders, 'label_encoders.pkl')