import { useState } from "react";

function SignupModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

   
    if (name === "phone" && !/^\d*$/.test(value)) {
      setError("Phone number must contain only digits");
      return;
    }

    setError("");
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d+$/.test(form.phone)) {
      setError("Phone number must contain only digits");
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/borrowers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error();
      }

      setMessage("Account created successfully!");
    } catch {
      setError("Failed to create account");
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ fontSize: 24 }}>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="phone"
            placeholder="Phone (numbers only)"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
            required
          />

          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.actions}>
            <button style={styles.button} type="submit">
              Create Account
            </button>
            <button style={styles.cancel} type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, Arial, sans-serif"
  },
  modal: {
    background: "white",
    padding: "45px 50px",
    borderRadius: 16,
    width: 460,
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  input: {
    padding: "14px 16px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20
  },
  button: {
    padding: "14px 22px",
    fontSize: 15,
    borderRadius: 8,
    border: "none",
    background: "#1976d2",
    color: "white",
    cursor: "pointer"
  },
  cancel: {
    padding: "14px 22px",
    fontSize: 15,
    borderRadius: 8,
    border: "none",
    background: "#ccc",
    cursor: "pointer"
  },
  success: {
    color: "green",
    fontSize: 14
  },
  error: {
    color: "red",
    fontSize: 14
  }
};

export default SignupModal;
