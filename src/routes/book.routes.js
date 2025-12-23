import express from 'express';
import Book from '../models/Book.js'; // Ensure you have a Book model file

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // MongoDB uses .findById
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Invalid Book ID format" });
  }
});

export default router;