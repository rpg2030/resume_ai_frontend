// src/pages/Login.jsx
import { useState, useContext } from "react";
import { login as apiLogin } from "../authClient";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await apiLogin(loginId, password);
      // data: { token, id, username, email, role }
      login(data.token, { id: data.id, username: data.username, role: data.role, email: data.email });
      nav("/"); // redirect to dashboard
    } catch (e) {
      setErr((e.response && e.response.data && e.response.data.error) || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 }}>
      <h3>Sign in</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="username or email" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        <button type="submit">Sign in</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
        Tip: create user via /auth/register or use the register page.
      </p>
    </div>
  );
}
