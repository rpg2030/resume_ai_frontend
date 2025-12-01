import RiskBadge from "./RiskBadge";

function CourtCaseSection({ data }) {
  if (!data) return null;
  const obj = JSON.parse(data);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Court Case Check</h3>
      <p>Status: <strong>{obj.status}</strong></p>
      <p>Matches: {obj.matches}</p>

      <RiskBadge
        color={obj.confidence >= 90 ? "green" : "yellow"}
        score={obj.confidence}
        label="Confidence"
      />
    </div>
  );
}

export default CourtCaseSection;
