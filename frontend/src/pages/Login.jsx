import { useState } from "react";
import { login } from "../services/api";
import SignupModal from "../components/SignupModal";

function Login() {
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
  const [showSignup, setShowSignup]=useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const token = await login(username, password);
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.groups[0];

      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }
    } catch {
      setError("Invalid username or password");
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={{ textAlign: "center", fontSize: 26 }}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Login
        </button>

        <button
          type="button"
          style={styles.signup}
          onClick={() => setShowSignup(true)}
        >
          Sign up
        </button>
      </form>

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    fontFamily: "Segoe UI, Arial, sans-serif"
  },
  card: {
    width: 420,
    padding: "40px 45px",
    borderRadius: 14,
    background: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: 18
  },
  error: {
    color: "#d32f2f",
    fontSize: 15,
    textAlign: "center"
  },
  input: {
    padding: "14px 16px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  button: {
    padding: "14px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    background: "#1976d2",
    color: "white",
    cursor: "pointer"
  },
  signup: {
    padding: "12px",
    fontSize: 15,
    borderRadius: 8,
    border: "1px solid #1976d2",
    background: "white",
    color: "#1976d2",
    cursor: "pointer"
  }
};

export default Login;
