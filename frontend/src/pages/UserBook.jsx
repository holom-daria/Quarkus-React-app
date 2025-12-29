import { useEffect, useState } from "react";
import { getAvailableBooks } from "../services/api";

function UserAvailableBooks() {
  const [books, setBooks]=useState([]);

  useEffect(() => {
    getAvailableBooks().then(data =>setBooks(data));
  }, []);

  return (
    <div style={styles.page}>
      <h2>Available Books</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>ISBN</th>
            <th style={styles.th}>Genre</th>
            <th style={styles.th}>Author</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td style={styles.td}>{book.id}</td>
              <td style={styles.td}>{book.title}</td>
              <td style={styles.td}>{book.isbn}</td>
              <td style={styles.td}>{book.genre}</td>
              <td style={styles.td}>{book.author}</td>
            </tr>
          ))}

          {books.length === 0 && (
            <tr>
              <td colSpan="5" style={styles.empty}>
                No books available at the moment
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
  },
  empty: {
    padding: 20,
    textAlign: "center",
    color: "#777"
  }
};

export default UserAvailableBooks;
