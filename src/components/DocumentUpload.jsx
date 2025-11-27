import { useState } from "react";
import { api } from "../api";

export default function DocumentUpload({ candidateId }) {
  const [pan, setPan] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    setMsg("Uploading...");
    try {
      await api.uploadDocuments(candidateId, pan, aadhaar);
      setMsg("Uploaded!");
    } catch (err) {
      setMsg("Error uploading");
    }
  };

  return (
    <div className="doc-upload">
      <h3>Upload PAN / Aadhaar</h3>

      <input type="file" onChange={(e) => setPan(e.target.files[0])} />
      <input type="file" onChange={(e) => setAadhaar(e.target.files[0])} />

      <button onClick={handleSubmit}>Submit</button>

      <p>{msg}</p>
    </div>
  );
}
