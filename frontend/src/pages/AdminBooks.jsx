import { useEffect, useState } from "react";
import { getBooks } from "../services/api";

function AdminBooks() {
  const [books, setBooks]=useState([]);
  const [search, setSearch]=useState("");

  useEffect(() =>{
    getBooks().then(setBooks);
  }, []);

  
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())|| book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2>All Books</h2>


      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={styles.search}
      />


      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Genre</th>
            <th style={styles.th}>ISBN</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id}>
              <td style={styles.td}>{book.id}</td>
              <td style={styles.td}>{book.title}</td>
              <td style={styles.td}>{book.author}</td>
              <td style={styles.td}>{book.genre}</td>
              <td style={styles.td}>{book.isbn}</td>
              <td style={styles.td}>
                {book.available ? (
                  <span style={styles.available}>Available</span>
                ) : (
                  <span style={styles.borrowed}>Borrowed</span>
                )}
              </td>
            </tr>
          ))}

          {filteredBooks.length === 0 && (
            <tr>
              <td colSpan="6" style={styles.empty}>
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  page: {
    padding: 30,
    background: "#f4f6f8"
  },
  search: {
    padding: 10,
    width: 320,
    marginBottom: 20,
    fontSize: 14
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    borderBottom: "2px solid #ccc",
    padding: 12,
    background: "#f5f5f5",
    textAlign: "left"
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: 12
  },
  available: {
    color: "green",
    fontWeight: "bold"
  },
  borrowed: {
    color: "red",
    fontWeight: "bold"
  },
  empty: {
    textAlign: "center",
    padding: 20
  }
};

export default AdminBooks;
