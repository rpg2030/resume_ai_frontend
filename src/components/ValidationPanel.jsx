// ValidationPanel.jsx
import React from "react";

function colorForConfidence(c) {
  if (c >= 90) return "green";
  if (c >= 60) return "orange";
  return "red";
}

export default function ValidationPanel({ data }) {
  if (!data) return null;
  if (data.error) return <div style={{ color: "red" }}>{data.error}</div>;

  const conf = data.confidence ?? null;
  return (
    <div style={{ marginTop: 12 }}>
      <h4>Document Validation</h4>
      <div>
        <strong>P AN:</strong> {data.pan_validation || "N/A"}
      </div>
      <div>
        <strong>Aadhaar:</strong> {data.aadhaar_validation || "N/A"}
      </div>
      <div>
        <strong>Document Fraud:</strong> {data.document_fraud || "N/A"}
      </div>
      <div>
        <strong>Confidence:</strong>{" "}
        <span style={{ color: conf !== null ? colorForConfidence(conf) : "black" }}>
          {conf !== null ? `${conf}%` : "N/A"}
        </span>
        {conf !== null && conf < 60 && <span style={{ marginLeft: 8, color: "red" }}>needs review</span>}
      </div>
    </div>
  );
}
