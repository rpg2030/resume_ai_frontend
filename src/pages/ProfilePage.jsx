import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

import CandidateProfile from "../components/CandidateProfile";
import DocumentUpload from "../components/DocumentUpload";

export default function ProfilePage() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [reqMsg, setReqMsg] = useState("");

  useEffect(() => {
    api.getCandidate(id).then((res) => setC(res.data));
  }, [id]);

  const askDocuments = async () => {
    const res = await api.requestDocuments(id);
    setReqMsg(res.data.message);
  };

  if (!c) return <p>Loading...</p>;

  return (
    <div className="page">
      <CandidateProfile c={c} />

      <button onClick={askDocuments}>Request PAN/Aadhaar</button>
      <p>{reqMsg}</p>

      <DocumentUpload candidateId={id} />
    </div>
  );
}
