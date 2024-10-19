
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    availableCopies: { type: Number, default: 0 }
});

export default mongoose.model('Book', bookSchema);
