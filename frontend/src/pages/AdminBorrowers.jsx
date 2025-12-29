import { useEffect, useState } from "react";
import { getBorrowers } from "../services/api";

function AdminBorrowers() {
  const [borrowers, setBorrowers]=useState([]);
  const [search, setSearch]=useState("");

  useEffect(() => {
    getBorrowers().then(setBorrowers);
  }, []);

  const filtered=borrowers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2>All Borrowers</h2>

     
      <input
        style={styles.search}
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Rating</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(b => (
            <tr key={b.id}>
              <td style={styles.td}>{b.id}</td>
              <td style={styles.td}>{b.name}</td>
              <td style={styles.td}>{b.email}</td>
              <td style={styles.td}>{b.phone}</td>
              <td style={styles.td}>{b.rating}</td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" style={styles.empty}>
                No borrowers found
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
    width: 260,
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
  empty: {
    textAlign: "center",
    padding: 20
  }
};

export default AdminBorrowers;
