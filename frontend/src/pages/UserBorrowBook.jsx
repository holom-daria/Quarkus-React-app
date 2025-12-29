import { useEffect, useState } from "react";
import { getAvailableBooks, borrowBook } from "../services/api";

function UserBorrowBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [days, setDays] = useState(14);

  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); 

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    getAvailableBooks().then(setBooks);
  }
async function handleBorrow(bookId) {
  try {
    await borrowBook(bookId, selectedDays);
    setPopup("Book borrowed successfully!");
    refreshAvailableBooks(); 
  } catch (err) {
    setPopup(err.message);
  }
}

  async function confirmBorrow() {
    try {
      await borrowBook({
        bookId: selectedBook.id,
        days
      });

      setPopupMessage("Book borrowed successfully!");
      setPopupType("success");

      setSelectedBook(null);
      loadBooks();
    } catch {
      setPopupMessage(
        "You can no longer borrow books because your rating is 0."
      );
      setPopupType("error");
      setSelectedBook(null);
    }
  }

  return (
    <div style={styles.page}>
      <h2>Borrow a Book</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Genre</th>
            <th style={styles.th}>ISBN</th>
            <th style={styles.th}></th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td style={styles.td}>{book.title}</td>
              <td style={styles.td}>{book.author}</td>
              <td style={styles.td}>{book.genre}</td>
              <td style={styles.td}>{book.isbn}</td>
              <td style={styles.td}>
                <button
                  style={styles.actionButton}
                  onClick={()=>setSelectedBook(book)}
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}

          {books.length === 0 && (
            <tr>
              <td colSpan="5" style={styles.empty}>
                No available books
              </td>
            </tr>
          )}
        </tbody>
      </table>

  
      {selectedBook && (
        <div style={modal.overlay}>
          <div style={modal.card}>
            <h3>Borrow "{selectedBook.title}"</h3>

            <label style={{ marginTop: 10 }}>
              Number of days (1–14)
            </label>

            <input
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={e => setDays(Number(e.target.value))}
              style={modal.input}
            />

            <div style={modal.buttons}>
              <button style={modal.confirm} onClick={confirmBorrow}>
                Confirm
              </button>
              <button
                style={modal.cancel}
                onClick={() => setSelectedBook(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

   
      {popupMessage && (
        <div style={modal.overlay}>
          <div
            style={{
              ...modal.card,
              borderLeft:
                popupType === "success"
                  ? "6px solid green"
                  : "6px solid red"
            }}
          >
            <h3>{popupType === "success" ? "Success" : "Error"}</h3>
            <p style={{ marginTop: 10 }}>{popupMessage}</p>

            <button
              style={modal.confirm}
              onClick={() => setPopupMessage("")}
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
    fontSize: 15,
    background: "#f4f6f8"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20
  },
  th: {
    borderBottom: "2px solid #ccc",
    padding: 12,
    background: "#f5f5f5",
    textAlign: "left",
    fontSize: 15
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: 12,
    fontSize: 15
  },
  actionButton: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "1px solid #333",
    background: "white",
    cursor: "pointer",
    fontSize: 14
  },
  empty: {
    textAlign: "center",
    padding: 20
  }
};

const modal = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  card: {
    background: "white",
    padding: 30,
    borderRadius: 8,
    width: 360,
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)"
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    fontSize: 14
  },
  buttons: {
    display: "flex",
    gap: 10,
    marginTop: 20
  },
  confirm: {
    flex: 1,
    padding: 10,
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 20,
    cursor: "pointer"
  },
  cancel: {
    flex: 1,
    padding: 10,
    background: "#ccc",
    border: "none",
    borderRadius: 20,
    cursor: "pointer"
  }
};

export default UserBorrowBook;
