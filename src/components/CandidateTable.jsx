import { Link } from "react-router-dom";

export default function CandidateTable({ data }) {
  return (
    <table className="candidate-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>Status</th>
          <th>Profile</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.company}</td>
            <td>{c.extraction_status}</td>
            <td>
              <Link to={`/profile/${c.id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
