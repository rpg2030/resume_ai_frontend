// AISummary.jsx
import React from "react";

export default function AISummary({ data }) {
  if (!data) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <h3>AI Summary</h3>
      <div>
        <strong>Summary:</strong>
        <p>{data.summary}</p>
      </div>
      <div>
        <strong>Top Skills:</strong>
        <p>{Array.isArray(data.top_skills) ? data.top_skills.join(", ") : data.top_skills}</p>
      </div>
      <div>
        <strong>Confidence:</strong> {data.confidence || "N/A"}
      </div>
    </div>
  );
}
