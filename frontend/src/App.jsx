import { Routes, Route } from "react-router-dom";


import Login from "./pages/Login";


import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import AdminBooks from "./pages/AdminBooks";
import AdminAddBook from "./pages/AdminAddBook";
import AdminUpdateBook from "./pages/AdminUpdateBook";
import AdminDeleteBook from "./pages/AdminDeleteBook";
import AdminBorrowers from "./pages/AdminBorrowers";
import AdminBorrowerHistory from "./pages/AdminBorrowerHistory";
import AdminOverdue from "./pages/AdminOverdue";
import AdminBooksByGenre from "./pages/AdminBooksByGenre";

import UserBook from "./pages/UserBook";
import UserBorrowBook from "./pages/UserBorrowBook"; 
import UserCurrent from "./pages/UserCurrent";
import UserHistory from "./pages/UserHistory";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/*login*/}
      <Route path="/" element={<Login />} />

      {/*admin dashboard*/}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/*admin*/}
      <Route path="/admin/books" element={<ProtectedRoute role="ADMIN"><AdminBooks /></ProtectedRoute>} />
      <Route path="/admin/books/add" element={<ProtectedRoute role="ADMIN"><AdminAddBook /></ProtectedRoute>} />
      <Route path="/admin/books/update" element={<ProtectedRoute role="ADMIN"><AdminUpdateBook /></ProtectedRoute>} />
      <Route path="/admin/books/delete" element={<ProtectedRoute role="ADMIN"><AdminDeleteBook /></ProtectedRoute>} />
      <Route path="/admin/books/genre" element={<ProtectedRoute role="ADMIN"><AdminBooksByGenre /></ProtectedRoute>} />
      <Route path="/admin/borrowers" element={<ProtectedRoute role="ADMIN"><AdminBorrowers /></ProtectedRoute>} />
      <Route path="/admin/borrower-history" element={<ProtectedRoute role="ADMIN"><AdminBorrowerHistory /></ProtectedRoute>} />
      <Route path="/admin/overdue" element={<ProtectedRoute role="ADMIN"><AdminOverdue /></ProtectedRoute>} />

      {/*user dashboard */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/*user*/}
      <Route path="/user/books" element={<ProtectedRoute role="USER"><UserBook /></ProtectedRoute>} />
      <Route path="/user/borrow" element={<ProtectedRoute role="USER"><UserBorrowBook /></ProtectedRoute>} />
      <Route path="/user/current" element={<ProtectedRoute role="USER"><UserCurrent /></ProtectedRoute>} />
      <Route path="/user/history" element={<ProtectedRoute role="USER"><UserHistory /></ProtectedRoute>} />

    </Routes>
  );
}

export default App;
