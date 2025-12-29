import { useEffect, useState } from "react";
import { getBorrowers } from "../services/api";

export default function AdminBorrowers() {
  const [list, setList]=useState([]);

  useEffect(() => {
    getBorrowers().then(setList);
  }, []);

  return (
    <>
      <h2>Borrowers</h2>
      <ul>
        {list.map(b => (
          <li key={b.id}>{b.name}—rating {b.rating}</li>
        ))}
      </ul>
    </>
  );
}
