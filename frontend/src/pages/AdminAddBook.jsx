import { useState } from "react";
import { addBook } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminAddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: ""
  });

  const [message, setMessage]=useState("");
  const [error, setError]=useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await addBook(book);
      setMessage("Book added successfully!");
      setBook({ title: "", author: "", genre: "" });

      setTimeout(() =>{
        navigate("/admin/books");
      }, 1500);
    } catch {
      setError("Failed to add book.");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Book</h2>

        {message && <div style={styles.success}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Title"
            value={book.title}
            onChange={e => setBook({ ...book, title: e.target.value })}
            required
          />

          <input
            style={styles.input}
            placeholder="Author"
            value={book.author}
            onChange={e => setBook({ ...book, author: e.target.value })}
            required
          />

          <input
            style={styles.input}
            placeholder="Genre"
            value={book.genre}
            onChange={e => setBook({ ...book, genre: e.target.value })}
            required
          />

          <button type="submit" style={styles.button}>
            Add Book
          </button>

          <button
            type="button"
            style={styles.back}
            onClick={() => navigate("/admin")}
          >
            Back to Menu
          </button>
        </form>
      </div>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: 420,
    padding: 30,
    background: "white",
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: {
    marginBottom: 20,
    letterSpacing: 1
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  },
  input: {
    padding: 12,
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 30,
    border: "none",
    background: "#1976d2",
    color: "white",
    fontSize: 14,
    cursor: "pointer"
  },
  back: {
    marginTop: 10,
    padding: 10,
    borderRadius: 30,
    border: "1px solid #333",
    background: "white",
    cursor: "pointer"
  },
  success: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
    background: "#e8f5e9",
    color: "#2e7d32"
  },
  error: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
    background: "#fdecea",
    color: "#c62828"
  }
};

export default AdminAddBook;
