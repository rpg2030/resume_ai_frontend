import RiskBadge from "./RiskBadge";

function SocialScanSection({ data }) {
  if (!data) return null;

  const obj = JSON.parse(data);

  const color =
    obj.risk_score === 0 ? "green" :
    obj.risk_score < 40 ? "yellow" : "red";

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Social Footprint Scan</h3>
      <p>Status: <strong>{obj.status}</strong></p>
      <p>Comment: {obj.comment}</p>

      <RiskBadge
        color={color}
        score={100 - obj.risk_score}
        label="Social Score"
      />
    </div>
  );
}

export default SocialScanSection;
