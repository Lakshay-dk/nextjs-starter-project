import React, { useState } from 'react';

const BookItem = ({ book, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: book.title,
    author: book.author,
    status: book.status
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: book.title,
      author: book.author,
      status: book.status
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: book.title,
      author: book.author,
      status: book.status
    });
  };

  const handleSave = async () => {
    if (!editData.title.trim() || !editData.author.trim()) {
      alert('Please fill in both title and author fields');
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(book._id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating book:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await onDelete(book._id);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleStatus = async () => {
    const newStatus = book.status === 'read' ? 'unread' : 'read';
    try {
      await onUpdate(book._id, { ...book, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className={`book-item ${book.status}`}>
      {isEditing ? (
        <div className="book-edit-form">
          <div className="edit-field">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              placeholder="Book title"
            />
          </div>
          <div className="edit-field">
            <input
              type="text"
              name="author"
              value={editData.author}
              onChange={handleChange}
              placeholder="Author name"
            />
          </div>
          <div className="edit-field">
            <select
              name="status"
              value={editData.status}
              onChange={handleChange}
            >
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          <div className="edit-actions">
            <button 
              onClick={handleSave} 
              className="save-btn"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="book-content">
          <div className="book-info">
            <h4 className="book-title">{book.title}</h4>
            <p className="book-author">by {book.author}</p>
            <span className={`status-badge ${book.status}`}>
              {book.status === 'read' ? '✓ Read' : '○ Unread'}
            </span>
          </div>
          
          <div className="book-actions">
            <button 
              onClick={toggleStatus} 
              className={`status-btn ${book.status}`}
              title={`Mark as ${book.status === 'read' ? 'unread' : 'read'}`}
            >
              {book.status === 'read' ? 'Mark Unread' : 'Mark Read'}
            </button>
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookItem;
