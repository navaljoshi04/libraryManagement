
import BorrowRecord from '../models/borrowRecord.js';
import Book from '../models/book.js';

export const borrowBook = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: 'No copies available' });
        }

        const record = new BorrowRecord({ user: userId, book: bookId });
        await record.save();

        book.availableCopies--;
        await book.save();

        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const returnBook = async (req, res) => {
    const { recordId } = req.body;

    try {
        const record = await BorrowRecord.findById(recordId).populate('book');
        if (!record) {
            return res.status(404).json({ message: 'Borrow record not found' });
        }

        record.returnDate = Date.now();
        await record.save();

        record.book.availableCopies++;
        await record.book.save();

        res.json({ message: 'Book returned' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
