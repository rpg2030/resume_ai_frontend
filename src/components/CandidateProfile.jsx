export default function CandidateProfile({ c }) {
  return (
    <div className="profile-section">
      <h2>{c.name}</h2>

      <p><b>Email:</b> {c.email}</p>
      <p><b>Phone:</b> {c.phone}</p>
      <p><b>Company:</b> {c.company}</p>
      <p><b>Designation:</b> {c.designation}</p>
      <p><b>Skills:</b> {c.skills}</p>

      <p><b>Resume:</b> {c.resume_file}</p>
    </div>
  );
}
