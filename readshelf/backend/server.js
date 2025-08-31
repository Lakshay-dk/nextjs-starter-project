const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/readshelf';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['read', 'unread'],
    default: 'unread'
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

// Routes

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status && (status === 'read' || status === 'unread')) {
      filter.status = status;
    }
    
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, status } = req.body;
    
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    
    const book = new Book({
      title,
      author,
      status: status || 'unread'
    });
    
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update book
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, author, status } = req.body;
    
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, status },
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'ReadShelf API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
