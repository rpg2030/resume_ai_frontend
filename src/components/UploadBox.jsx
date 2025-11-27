import { useState } from "react";
import { api } from "../api";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading...");
    try {
      await api.uploadResume(file);
      setStatus("Uploaded & Processed!");
    } catch {
      setStatus("Error uploading");
    }
  };

  return (
    <div className="upload-box">
      <h2>Upload Resume</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>

      <p>{status}</p>
    </div>
  );
}
