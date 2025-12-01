// ConsentModal.jsx
import React, { useState } from "react";
import { api } from "../api";

export default function ConsentModal({ open, candidate, onClose, onSaved }) {
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState("");
  if (!open) return null;

  const save = async () => {
    try {
      const res = await api.saveConsent(candidate.id, { consent: checked, note });
      onSaved(res.data);
    } catch (e) {
      alert("failed to save consent");
    }
  };

  return (
    <div style={{ position: "fixed", left: 20, right: 20, top: 20, background: "white", padding: 20, border: "1px solid #ddd" }}>
      <h3>Consent for KYC</h3>
      <p>Please accept terms before uploading PAN/Aadhaar. This site will only use documents for verification.</p>

      <label>
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} /> I consent to KYC checks
      </label>

      <div style={{ marginTop: 8 }}>
        <textarea placeholder="Optional note" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={save}>Save</button>
        <button onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </div>
  );
}
