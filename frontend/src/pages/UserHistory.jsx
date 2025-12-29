import { useEffect, useState } from "react";
import { myBorrowingHistory } from "../services/api";

function UserBorrowingHistory() {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    myBorrowingHistory()
      .then(data => {
        setBorrowings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <h2>My Borrowing History</h2>

      {loading && <p>Loading...</p>}

      {!loading && borrowings.length === 0 && (
        <p>You have no borrowing history.</p>
      )}

      {!loading && borrowings.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Book Title</th>
              <th style={styles.th}>Author</th>
              <th style={styles.th}>ISBN</th>
              <th style={styles.th}>Borrow Date</th>
              <th style={styles.th}>Return Date</th>
            </tr>
          </thead>

          <tbody>
            {borrowings.map(b => (
              <tr key={b.id}>
                <td style={styles.td}>{b.book.title}</td>
                <td style={styles.td}>{b.book.author}</td>
                <td style={styles.td}>{b.book.isbn}</td>
                <td style={styles.td}>{b.borrowDate}</td>
                <td style={styles.td}>
                  {b.returnDate ? b.returnDate : "Not returned"}
                </td>
              </tr>
            ))}
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

export default UserBorrowingHistory;
