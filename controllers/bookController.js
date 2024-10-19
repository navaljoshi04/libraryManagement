
import Book from '../models/book.js';

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addBook = async (req, res) => {
    const { title, author, category, availableCopies } = req.body;
    const book = new Book({ title, author, category, availableCopies });

    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//for deleting the book: 
export const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
