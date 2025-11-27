import { useEffect, useState } from "react";
import { api } from "../api";
import UploadBox from "../components/UploadBox";
import CandidateTable from "../components/CandidateTable";

export default function CandidatesPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
  api.getCandidates().then((res) => {
    console.log("CANDIDATES RESPONSE:", res.data);  // ADD THIS
    setList(res.data);
  });
}, []);

  return (
    <div className="page">
      <UploadBox />
      <h2>Candidates</h2>
      <CandidateTable data={list} />
    </div>
  );
}
