import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate=useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>MENU</h1>

      <div style={styles.grid}>
        <button style={styles.button} onClick={() => navigate("/user/books")}>
          View available books
        </button>

        <button
  style={styles.button}
  onClick={() => navigate("/user/borrow")}
>
  Borrow a book
</button>


        <button style={styles.button} onClick={()=>navigate("/user/current")}>
          My current borrowings
        </button>

        <button style={styles.button} onClick={()=>navigate("/user/history")}>
          My borrowing history
        </button>
      </div>

      <button style={styles.logout} onClick={logout}>
        LOG OUT
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2f7"
  },
  title: {
    marginBottom: 30,
    letterSpacing: 2
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 260px)",
    gap: 15,
    marginBottom: 30
  },
  button: {
    padding: "12px 16px",
    borderRadius: 30,
    border: "1px solid #333",
    background: "white",
    cursor: "pointer",
    fontSize: 14
  },
  logout: {
    padding: "10px 40px",
    borderRadius: 30,
    border: "none",
    background: "#1976d2",
    color: "white",
    cursor: "pointer",
    fontSize: 14
  }
};

export default UserDashboard;
