export default function BookList({ books, setEditBook, deleteBook }) {
  if (!books.length) return <p>No books found</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} ({book.publishedYear})
            <button onClick={() => setEditBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
