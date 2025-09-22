import { useState, useEffect } from "react";

export default function BookForm({ addBook, editBook, updateBook }) {
  const [form, setForm] = useState({ title: "", author: "", publishedYear: "" });

  useEffect(() => {
    if (editBook) setForm(editBook);
  }, [editBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBook) {
      updateBook(editBook._id, form);
    } else {
      addBook(form);
    }
    setForm({ title: "", author: "", publishedYear: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editBook ? "Edit Book" : "Add Book"}</h2>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
      <input placeholder="Published Year" value={form.publishedYear} onChange={e => setForm({ ...form, publishedYear: e.target.value })} />
      <button type="submit">{editBook ? "Update" : "Add"}</button>
    </form>
  );
}
