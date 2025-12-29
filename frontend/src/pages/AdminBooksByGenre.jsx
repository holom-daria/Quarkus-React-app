import { useState } from "react";
import { searchBooks } from "../services/api";

function AdminBooksByGenre() {
  const [genre, setGenre]=useState("");
  const [books, setBooks]=useState([]);
  const [searched, setSearched]=useState(false);

  async function handleSearch() {
    const data=await searchBooks(genre);
    setBooks(data);
    setSearched(true);
  }

  return (
    <div style={styles.page}>
      <h2>Search Books by Genre</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Enter genre (for example: SF)"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {searched && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Author</th>
              <th style={styles.th}>Genre</th>
              <th style={styles.th}>ISBN</th>
            </tr>
          </thead>

          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td style={styles.td}>{book.title}</td>
                <td style={styles.td}>{book.author}</td>
                <td style={styles.td}>{book.genre}</td>
                <td style={styles.td}>{book.isbn}</td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: 15, textAlign: "center" }}>
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: 30,
    background: "#f4f6f8"
  },
  input: {
    padding: 10,
    marginRight: 10,
    width: 250
  },
  button: {
    padding: "10px 20px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20
  },
  th: {
    borderBottom: "2px solid #ccc",
    padding: 10,
    textAlign: "left",
    background: "#f5f5f5"
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: 10
  }
};

export default AdminBooksByGenre;
