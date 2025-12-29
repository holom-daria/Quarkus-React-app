import { useState } from "react";
import { getBorrowerHistory } from "../services/api";

function AdminBorrowerHistory() {
  const [borrowerId, setBorrowerId]=useState("");
  const [history, setHistory]=useState([]);
  const [searched, setSearched]=useState(false);

  async function handleSearch() {
    if (!borrowerId) return;
    const data=await getBorrowerHistory(borrowerId);
    setHistory(data);
    setSearched(true);
  }

  return (
    <div style={styles.page}>
      <h2>Borrower History</h2>

      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Enter borrower ID"
          value={borrowerId}
          onChange={e => setBorrowerId(e.target.value)}
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
              <th style={styles.th}>Borrower</th>
              <th style={styles.th}>Book Title</th>
              <th style={styles.th}>ISBN</th>
              <th style={styles.th}>Borrow Date</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Return Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map(b => (
              <tr key={b.id}>
                <td style={styles.td}>{b.borrower.name}</td>
                <td style={styles.td}>{b.book.title}</td>
                <td style={styles.td}>{b.book.isbn}</td>
                <td style={styles.td}>{b.borrowDate}</td>
                <td style={styles.td}>{b.dueDate}</td>
                <td style={styles.td}>
                  {b.returnDate ? b.returnDate : "Not returned yet"}
                </td>
              </tr>
            ))}

            {history.length === 0 && (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  No borrowings found for this borrower
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
  searchRow: {
    marginBottom: 20
  },
  input: {
    padding: 10,
    width: 200,
    marginRight: 10
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
  },
  empty: {
    padding: 20,
    textAlign: "center",
    color: "#777"
  }
};

export default AdminBorrowerHistory;
