import { useEffect, useState } from "react";
import { myCurrentBorrowings, returnBook } from "../services/api";

function UserCurrentBorrowings() {
  const [borrowings, setBorrowings]=useState([]);
  const [popup, setPopup]=useState(null);

  useEffect(() => {
    loadBorrowings();
  }, []);

  function loadBorrowings() {
    myCurrentBorrowings().then(data=>setBorrowings(data));
  }

  async function handleReturn(borrowingId) {
    try {
      const response=await returnBook(borrowingId);
      let message="Book returned successfully.";

      if (response?.lateDays !== undefined) {
        if (response.lateDays > 0) {
          message = `Returned ${response.lateDays} days late.
Your rating decreased to ${response.newRating}.`;
        } else {
          message = "Book returned successfully on time.";
        }
      }

      setPopup({ type: "success", message });
      loadBorrowings();
    } catch (e) {
      setPopup({ type: "error", message: "Failed to return book." });
    }
  }

  function isOverdue(dueDate) {
    return new Date(dueDate) < new Date();
  }

  return (
    <div style={styles.page}>
      <h2>My Current Borrowings</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Book ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>ISBN</th>
            <th style={styles.th}>Borrow Date</th>
            <th style={styles.th}>Due Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {borrowings.map(b => {
            const overdue = isOverdue(b.dueDate);

            return (
              <tr key={b.id}>
                <td style={styles.td}>{b.book.id}</td>
                <td style={styles.td}>{b.book.title}</td>
                <td style={styles.td}>{b.book.author}</td>
                <td style={styles.td}>{b.book.isbn}</td>
                <td style={styles.td}>{b.borrowDate}</td>
                <td style={styles.td}>{b.dueDate}</td>
                <td style={{
                  ...styles.td,
                  color: overdue ? "red" : "green",
                  fontWeight: 600
                }}>
                  {overdue ? "Overdue" : "On time"}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.returnBtn}
                    onClick={() => handleReturn(b.id)}
                  >
                    Return Book
                  </button>
                </td>
              </tr>
            );
          })}

          {borrowings.length === 0 && (
            <tr>
              <td colSpan="8" style={styles.empty}>
                You have no active borrowings
              </td>
            </tr>
          )}
        </tbody>
      </table>

      
      {popup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <p>{popup.message}</p>
            <button
              style={styles.popupBtn}
              onClick={() => setPopup(null)}
            >
              OK
            </button>
          </div>
        </div>
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
    background: "#f5f5f5",
    textAlign: "left"
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: 10
  },
  returnBtn: {
    padding: "6px 12px",
    borderRadius: 6,
    border: "none",
    background: "#1976d2",
    color: "white",
    cursor: "pointer"
  },
  empty: {
    padding: 20,
    textAlign: "center",
    color: "#777"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  popup: {
    background: "white",
    padding: 30,
    borderRadius: 10,
    width: 380,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  popupBtn: {
    marginTop: 20,
    padding: "8px 20px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};

export default UserCurrentBorrowings;
