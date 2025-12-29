import { useState } from "react";
import { updateBook } from "../services/api";

function AdminUpdateBook() {
  const [id, setId]=useState("");
  const [title, setTitle] =useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const [message, setMessage]=useState("");
  const [success, setSuccess]=useState(false);
  const [showPopup, setShowPopup]=useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setShowPopup(false);

    try {
      await updateBook(id, { title, author, genre });

      setSuccess(true);
      setMessage("Book updated successfully!");
    } catch {
      setSuccess(false);
      setMessage("Book not found!");
    }

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }

  return (
    <div style={styles.page}>
      <h2>Update Book</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Book ID"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />

        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <input
          style={styles.input}
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />

        <input
          style={styles.input}
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Update Book
        </button>
      </form>

      {showPopup && (
        <div
          style={{
            ...styles.popup,
            backgroundColor: success ? "#4caf50" : "#f44336"
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: 30,
    maxWidth: 400,
    margin: "0 auto",
    background: "#f4f6f8"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc"
  },
  button: {
    padding: 10,
    fontSize: 15,
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  },
 popup: {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "30px 50px",
  color: "white",
  borderRadius: 10,
  fontSize: 18,
  fontWeight: "bold",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  animation: "popupFade 0.4s ease",
  zIndex: 1000
}

};

export default AdminUpdateBook;
