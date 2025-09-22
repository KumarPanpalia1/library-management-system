import { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./components/bookform.jsx";
import BookList from "./components/booklist.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API = axios.create({ baseURL: "http://localhost:4000/api/books" });

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  // Fetch books with search & pagination
  const fetchBooks = async () => {
    if (!user) return;
    try {
      const res = await API.get("/", {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { author: search, page, limit: 5 },
      });
      setBooks(res.data.books);
      setTotalPages(Math.ceil(res.data.total / res.data.limit));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user, page, search]);

  const addBook = async (book) => {
    await API.post("/", book, { headers: { Authorization: `Bearer ${user.token}` } });
    setPage(1); // reset to first page
    fetchBooks();
  };

  const updateBook = async (id, book) => {
    await API.put(`/${id}`, book, { headers: { Authorization: `Bearer ${user.token}` } });
    setEditBook(null);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await API.delete(`/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
    fetchBooks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Library App</h1>
        <Register setUser={setUser} />
        <hr />
        <Login setUser={setUser} />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Library Management</h1>
      <button onClick={logout}>Logout</button>

      {/* Search Bar */}
      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Search by author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setPage(1)}>Search</button>
      </div>

      <BookForm addBook={addBook} editBook={editBook} updateBook={updateBook} />
      <BookList books={books} setEditBook={setEditBook} deleteBook={deleteBook} />

      {/* Pagination */}
      <div style={{ marginTop: "1rem" }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span style={{ margin: "0 1rem" }}>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
