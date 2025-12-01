
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

import CandidateProfile from "../components/CandidateProfile";
import DocumentUpload from "../components/DocumentUpload";
import AISummary from "../components/AISummary";
import ConsentModal from "../components/ConsentModal";
import CourtCaseSection from "../components/CourtCaseSection";
import SocialScanSection from "../components/SocialScanSection";
import EmploymentConsistencySection from "../components/EmploymentConsistencySection";



// small badge for color-coded confidence
function RiskBadge({ color, score }) {
  const clr = {
    green: { background: "#c8f7c5", color: "#2e7d32" },
    yellow: { background: "#fff9c4", color: "#f9a825" },
    red: { background: "#ffcdd2", color: "#c62828" }
  };

  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: "6px",
        fontWeight: 600,
        ...clr[color]
      }}
    >
      {score}% match
    </span>
  );
}


export default function ProfilePage() {
  const { id } = useParams();

  const [c, setC] = useState(null);
  const [reqMsg, setReqMsg] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [showConsent, setShowConsent] = useState(false);

  // fetch candidate full data
  useEffect(() => {
    api.getCandidate(id).then((res) => {
      setC(res.data);
    });
  }, [id, refreshFlag]);


  // request PAN/Aadhaar email
  const askDocuments = async () => {
    try {
      const res = await api.requestDocuments(id);
      if (res.data.email_sent) {
        setReqMsg("Mail sent successfully!");
      } else {
        setReqMsg("Mail not sent. Check SMTP settings.");
      }
    } catch (err) {
      setReqMsg("Something went wrong.");
    }
  };


    const generateAiSummary = async () => {
      try {
        const res = await api.generateAISummary(id);
        setAiSummary(res.data);
      } catch (e) {
        setAiSummary({ summary: "AI summary failed" });
      }
    };

    const onConsentSaved = (consentObj) => {
      // refresh candidate
      api.getCandidate(id).then((res) => setC(res.data));
      setShowConsent(false);
    };

  // after upload, refresh data
  const afterUpload = () => {
    setTimeout(() => setRefreshFlag(v => !v), 500);
  };



  if (!c) return <p>Loading...</p>;

  // parse validations if stored
  let pan = null;
  let aadhaar = null;
  let court = null;
  let social = null;
  let employment = null

  try {
    if (c.pan_validation) pan = JSON.parse(c.pan_validation);
  } catch {}

  try {
    if (c.aadhaar_validation) aadhaar = JSON.parse(c.aadhaar_validation);
  } catch {}
  try {
  if (c.court_check) court = JSON.parse(c.court_check);
  } catch {}

  try {
    if (c.social_scan) social = JSON.parse(c.social_scan);
  } catch {}

  try {
    if (c.employment_check) employment = JSON.parse(c.employment_check);
  } catch {}

  return (
    <div className="page" style={{ padding: "20px" }}>
      
      <CandidateProfile c={c} />
      <div>
        <button
          onClick={askDocuments}
          style={{ marginTop: "10px", padding: "8px 14px" }}
        >
          Request PAN/Aadhaar
        </button>
        <button onClick={generateAiSummary} style={{ marginLeft: 8 }}>
            Generate AI Summary
        </button>
        <button onClick={() => setShowConsent(true)} style={{ marginLeft: 8 }}>
           Consent
        </button>
      </div>
      {reqMsg && <p>{reqMsg}</p>}
      <AISummary data={aiSummary} />

      {/* Document upload */}
      <DocumentUpload candidateId={id} onUploadDone={afterUpload} />

      {/* PAN VERIFICATION */}
      {pan && (
        <div style={{ marginTop: "25px" }}>
          <h3>PAN Verification</h3>

          <RiskBadge color={pan.color} score={pan.confidence} />

          <div style={{ marginTop: "10px" }}>
            <p><b>Name match:</b> {String(pan.match?.name_match)}</p>
            <p><b>DOB match:</b> {String(pan.match?.dob_match)}</p>
            <p><b>Phone match:</b> {String(pan.match?.phone_match)}</p>

            <p><b>Fraud score:</b> {pan.fraud_score}</p>
          </div>

          <details style={{ marginTop: "10px" }}>
            <summary>Extracted PAN Data</summary>
            <pre>{JSON.stringify(pan.extracted, null, 2)}</pre>
          </details>

        </div>
      )}


      {/* AADHAAR VERIFICATION */}
      {aadhaar && (
        <div style={{ marginTop: "25px" }}>
          <h3>Aadhaar Verification</h3>

          <RiskBadge color={aadhaar.color} score={aadhaar.confidence} />

          <div style={{ marginTop: "10px" }}>
            <p><b>Name match:</b> {String(aadhaar.match?.name_match)}</p>
            <p><b>DOB match:</b> {String(aadhaar.match?.dob_match)}</p>
            <p><b>Phone match:</b> {String(aadhaar.match?.phone_match)}</p>

            <p><b>Fraud score:</b> {aadhaar.fraud_score}</p>
          </div>

          <details style={{ marginTop: "10px" }}>
            <summary>Extracted Aadhaar Data</summary>
            <pre>{JSON.stringify(aadhaar.extracted, null, 2)}</pre>
          </details>
        </div>
      )}
      {court && (
        <div style={{ marginTop: "25px" }}>
          <h3>Court Case Result</h3>

          <RiskBadge color={court.color} score={court.score} />

          <div style={{ marginTop: "10px" }}>
            <p><b>Status:</b> {court.status}</p>
            <p><b>Summary:</b> {court.summary}</p>
          </div>

          <details style={{ marginTop: "10px" }}>
            <summary>Raw Court Scan</summary>
            <pre>{JSON.stringify(court, null, 2)}</pre>
          </details>
        </div>
      )}

      {/* SOCIAL SCAN RESULT */}
      {social && (
        <div style={{ marginTop: "25px" }}>
          <h3>Social Footprint Scan</h3>

          <RiskBadge color={social.color} score={social.score} />

          <div style={{ marginTop: "10px" }}>
            <p><b>Summary:</b> {social.summary}</p>
          </div>

          <details style={{ marginTop: "10px" }}>
            <summary>Raw Social Data</summary>
            <pre>{JSON.stringify(social, null, 2)}</pre>
          </details>
        </div>
      )}


      {/* EMPLOYMENT CONSISTENCY */}
      {employment && (
        <div style={{ marginTop: "25px" }}>
          <h3>Employment Consistency</h3>

          <RiskBadge color={employment.color} score={employment.consistency_score} />

          <div style={{ marginTop: "10px" }}>
            <p><b>Consistency Score:</b> {employment.consistency_score}%</p>

            <ul>
              {employment.reasons?.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>

          <details style={{ marginTop: "10px" }}>
            <summary>Raw Employment Check</summary>
            <pre>{JSON.stringify(employment, null, 2)}</pre>
          </details>
        </div>
      )}

      <ConsentModal open={showConsent} candidate={c} onClose={() => setShowConsent(false)} onSaved={onConsentSaved} />
    </div>
  );
}
