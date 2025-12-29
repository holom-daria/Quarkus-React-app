const API = "http://localhost:8081";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };
}

/*auth*/
export async function login(username, password) {
  const res=await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data=await res.json();
  return data.data; 
}


export async function registerUser(user) {
  const res = await fetch("http://localhost:8081/borrowers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}

/* books*/
export const getBooks = () =>
  fetch(`${API}/books`, { headers: headers() }).then(r => r.json());

export const getAvailableBooks = () =>
  fetch(`${API}/books/available`, { headers: headers() }).then(r => r.json());

export const addBook = (book) =>
  fetch(`${API}/books`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(book)
  }).then(r => r.json());

export const updateBook = async (id, book) => {
  const response = await fetch(`${API}/books/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(book)
  });

  if (!response.ok) {
    throw new Error("Book not found");
  }

  return response.json();
};

export const searchBooks=(query) =>
  fetch(`${API}/books/search?q=${query}`, {
    headers: headers()
  }).then(r => r.json());

export const deleteBook=(id) =>
  fetch(`${API}/books/${id}`, {
    method: "DELETE",
    headers: headers()
  }).then(r => r.json());

/* borrowers*/
export const getBorrowers=() =>
  fetch(`${API}/borrowers`, {headers: headers() }).then(r=>r.json());

export const getBorrowerHistory = (id) =>
  fetch(`${API}/borrowings/borrower/${id}`, {
    headers: headers()
  }).then(r => r.json());

/* borrowings */
export const getOverdue = () =>
  fetch(`${API}/borrowings/overdue`, {
    headers: headers()
  }).then(r => r.json());

export const borrowBook=(bookId, days) =>
  fetch(`${API}/borrowings`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ bookId, days })
  }).then(async r => {
    const data=await r.json();
    if (!r.ok) throw new Error(data.message);
    return data;
  });


export const myCurrentBorrowings = () =>
  fetch(`${API}/borrowings/me/current`, {
    headers: headers()
  }).then(r => r.json());

export const myBorrowingHistory = () =>
  fetch(`${API}/borrowings/me/history`, {
    headers: headers()
  }).then(r => r.json());

export const returnBook = (id) =>
  fetch(`${API}/borrowings/me/return/${id}`, {
    method: "PUT",
    headers: headers()
  }).then(r => r.json());
