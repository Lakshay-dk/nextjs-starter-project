import React, { useState } from 'react';

const BookForm = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'unread'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Please fill in both title and author fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAddBook(formData);
      setFormData({
        title: '',
        author: '',
        status: 'unread'
      });
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="book-form-container">
      <h3>Add New Book</h3>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
