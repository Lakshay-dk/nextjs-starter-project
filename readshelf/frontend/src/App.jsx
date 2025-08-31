import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Filter from './components/Filter';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch books from API
  const fetchBooks = async (statusFilter = '') => {
    try {
      setLoading(true);
      const url = statusFilter ? `${API_BASE_URL}/books?status=${statusFilter}` : `${API_BASE_URL}/books`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
      setError('');
    } catch (err) {
      setError('Error fetching books: ' + err.message);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new book
  const addBook = async (bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const newBook = await response.json();
      setBooks(prev => [newBook, ...prev]);
      applyFilter([newBook, ...books], filter);
      setError('');
    } catch (err) {
      setError('Error adding book: ' + err.message);
      console.error('Error adding book:', err);
    }
  };

  // Update book
  const updateBook = async (id, bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();
      const updatedBooks = books.map(book => 
        book._id === id ? updatedBook : book
      );
      setBooks(updatedBooks);
      applyFilter(updatedBooks, filter);
      setError('');
    } catch (err) {
      setError('Error updating book: ' + err.message);
      console.error('Error updating book:', err);
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      const updatedBooks = books.filter(book => book._id !== id);
      setBooks(updatedBooks);
      applyFilter(updatedBooks, filter);
      setError('');
    } catch (err) {
      setError('Error deleting book: ' + err.message);
      console.error('Error deleting book:', err);
    }
  };

  // Apply filter to books
  const applyFilter = (bookList, filterType) => {
    let filtered = bookList;
    
    switch (filterType) {
      case 'read':
        filtered = bookList.filter(book => book.status === 'read');
        break;
      case 'unread':
        filtered = bookList.filter(book => book.status === 'unread');
        break;
      default:
        filtered = bookList;
    }
    
    setFilteredBooks(filtered);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    applyFilter(books, newFilter);
  };

  // Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="App">
      <Navbar />
      
      <div className="container">
        <header className="app-header">
          <h1>ReadShelf</h1>
          <p>Your Personal Book Library</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="main-content">
          <div className="sidebar">
            <BookForm onAddBook={addBook} />
            <Filter 
              currentFilter={filter} 
              onFilterChange={handleFilterChange}
              bookCounts={{
                total: books.length,
                read: books.filter(b => b.status === 'read').length,
                unread: books.filter(b => b.status === 'unread').length
              }}
            />
          </div>

          <div className="book-section">
            {loading ? (
              <div className="loading">Loading books...</div>
            ) : (
              <BookList 
                books={filteredBooks}
                onUpdateBook={updateBook}
                onDeleteBook={deleteBook}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
