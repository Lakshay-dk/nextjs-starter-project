import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books, onUpdateBook, onDeleteBook }) => {
  if (books.length === 0) {
    return (
      <div className="book-list-container">
        <div className="empty-state">
          <h3>No books found</h3>
          <p>Add your first book to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h3>Your Books ({books.length})</h3>
      </div>
      
      <div className="book-list">
        {books.map(book => (
          <BookItem
            key={book._id}
            book={book}
            onUpdate={onUpdateBook}
            onDelete={onDeleteBook}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
