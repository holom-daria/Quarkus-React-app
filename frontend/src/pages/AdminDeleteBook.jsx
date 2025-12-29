import { useState } from "react";
import { deleteBook } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminDeleteBook() {
  const [id, setId]=useState("");
  const [message, setMessage]=useState("");
  const [error, setError]=useState(false);

  const navigate=useNavigate();

  async function handleDelete() {
    setMessage("");
    setError(false);

    if (!id || isNaN(id)) {
      setMessage("Please enter a valid numeric book ID");
      setError(true);
      return;
    }

    try {
      const res=await deleteBook(id);

      if (res.status === "ERROR") {
        setMessage(res.message||"Book not found");
        setError(true);
      } else {
        setMessage("Book deleted successfully!");
        setError(false);
        setId("");
      }
    } catch (e) {
      setMessage("Error: Book not found or cannot be deleted");
      setError(true);
    }
  }

  return (
    <div style={styles.page}>
      <h2>Delete Book</h2>

      <input
        type="text"
        placeholder="Enter Book ID"
        value={id}
        onChange={e => setId(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleDelete}>
        Delete Book
      </button>

      {message && (
        <div
          style={{
            ...styles.popup,
            background: error ? "#fdecea" : "#e6f4ea",
            color: error ? "#b00020" : "#1b5e20"
          }}
        >
          {message}
        </div>
      )}

      <button style={styles.back} onClick={() => navigate("/admin")}>
        Back to menu
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2f7",
    padding: 20
  },
  input: {
    width: 300,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    width: 300,
    padding: 14,
    fontSize: 16,
    borderRadius: 30,
    border: "none",
    background: "#d32f2f",
    color: "white",
    cursor: "pointer",
    marginBottom: 20
  },
  popup: {
    width: 360,
    padding: 16,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  },
  back: {
    marginTop: 10,
    padding: "10px 30px",
    borderRadius: 30,
    border: "1px solid #333",
    background: "white",
    cursor: "pointer",
    fontSize: 14
  }
};

export default AdminDeleteBook;
