
import { useState } from "react";
import { api } from "../api";
import RiskBadge from "./RiskBadge";

export default function DocumentUpload({ candidateId }) {
  const [pan, setPan] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);
  const [message, setMessage] = useState("");

  const submitDocs = async (e) => {
    e.preventDefault();

    const panFile = e.target.pan.files[0];
    const aadhaarFile = e.target.aadhaar.files[0];

    const res = await api.uploadDocuments(candidateId, panFile, aadhaarFile);

    setMessage("Documents uploaded successfully!");

    // backend returns JSON strings → must parse them
    const panData = res.data.pan ? JSON.parse(res.data.pan) : null;
    const aadhaarData = res.data.aadhaar ? JSON.parse(res.data.aadhaar) : null;

    setPan(panData);
    setAadhaar(aadhaarData);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Upload PAN & Aadhaar</h2>

      <form onSubmit={submitDocs}>
        <div>
          <label>(jpg/png) PAN Card:</label>
          <input type="file" name="pan" accept="image/*,application/pdf" />
        </div>

        <div>
          <label>(jpg/png) Aadhaar Card:</label>
          <input type="file" name="aadhaar" accept="image/*,application/pdf" />
        </div>

        <button type="submit">Upload</button>
      </form>

      <p>{message}</p>

      {/* ---------------- PAN RESULTS ---------------- */}
      {pan && (
        <div style={{ marginTop: "20px" }}>
          <h3>PAN Verification</h3>

          <RiskBadge color={pan.color} score={pan.confidence} />

          <p><b>Name Match:</b> {String(pan.match.name_match)}</p>
          <p><b>DOB Match:</b> {String(pan.match.dob_match)}</p>
          {pan.match.phone_match !== null && (
            <p><b>Phone Match:</b> {String(pan.match.phone_match)}</p>
          )}

          <p><b>Fraud Score:</b> {pan.fraud_score}</p>
        </div>
      )}

      {/* ---------------- AADHAAR RESULTS ---------------- */}
      {aadhaar && (
        <div style={{ marginTop: "20px" }}>
          <h3>Aadhaar Verification</h3>

          <RiskBadge color={aadhaar.color} score={aadhaar.confidence} />

          <p><b>Name Match:</b> {String(aadhaar.match.name_match)}</p>
          <p><b>DOB Match:</b> {String(aadhaar.match.dob_match)}</p>
          {aadhaar.match.phone_match !== null && (
            <p><b>Phone Match:</b> {String(aadhaar.match.phone_match)}</p>
          )}

          <p><b>Fraud Score:</b> {aadhaar.fraud_score}</p>
        </div>
      )}
    </div>
  );
}
