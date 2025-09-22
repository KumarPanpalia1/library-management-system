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

  const API = axios.create({ baseURL: "http://localhost:4000/api/books" });

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    if (!user) return;
    try {
      const res = await API.get("/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBooks(res.data.books);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  const addBook = async (book) => {
    await API.post("/", book, { headers: { Authorization: `Bearer ${user.token}` } });
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
      <BookForm addBook={addBook} editBook={editBook} updateBook={updateBook} />
      <BookList books={books} setEditBook={setEditBook} deleteBook={deleteBook} />
    </div>
  );
}
