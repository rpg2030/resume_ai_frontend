import RiskBadge from "./RiskBadge";

function EmploymentConsistencySection({ data }) {
  if (!data) return null;

  const obj = JSON.parse(data);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Employment Consistency Check</h3>

      <RiskBadge
        color={obj.color}
        score={obj.consistency_score}
        label="Consistency"
      />

      <ul style={{ marginTop: "10px" }}>
        {obj.reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmploymentConsistencySection;
