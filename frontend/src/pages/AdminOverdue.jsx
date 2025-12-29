import { useEffect, useState } from "react";
import { getOverdue } from "../services/api";

function AdminOverdue() {
  const [borrowings, setBorrowings]=useState([]);

  useEffect(() => {
    getOverdue().then(data=> setBorrowings(data));
  }, []);

  return (
    <div style={styles.page}>
      <h2>Overdue Borrowings</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Book Title</th>
            <th style={styles.th}>ISBN</th>
            <th style={styles.th}>Borrower</th>
            <th style={styles.th}>Borrow Date</th>
            <th style={styles.th}>Due Date</th>
          </tr>
        </thead>

        <tbody>
          {borrowings.map(b => (
            <tr key={b.id}>
              <td style={styles.td}>{b.book.title}</td>
              <td style={styles.td}>{b.book.isbn}</td>
              <td style={styles.td}>{b.borrower.name}</td>
              <td style={styles.td}>{b.borrowDate}</td>
              <td style={{ ...styles.td, color: "red", fontWeight: "bold" }}>
                {b.dueDate}
              </td>
            </tr>
          ))}

          {borrowings.length === 0 && (
            <tr>
              <td colSpan="5" style={styles.empty}>
                No overdue borrowings 
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

export default AdminOverdue;
