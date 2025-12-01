export default function RiskBadge({ color, score }) {
  const styles = {
    green: { background: "#c8f7c5", color: "#2e7d32" },
    yellow: { background: "#fff9c4", color: "#f9a825" },
    red: { background: "#ffcdd2", color: "#c62828" }
  };

  return (
    <span style={{
      padding: "6px 10px",
      borderRadius: "6px",
      fontWeight: 600,
      ...styles[color]
    }}>
      {score}% match
    </span>
  );
}
