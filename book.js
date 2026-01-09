const mongoose = require("mongoose");

// Define the schema for a Book document.
// Each field below maps to a property stored in MongoDB.
const bookSchema = new mongoose.Schema({
  // Title is required for a book — it's a good example of simple validation
  title: {
    type: String,
    required: true,
  },
  // Optional author field (string)
  author: String,
  // `borrowed` indicates whether the book is currently checked out
  // It defaults to `false` for new books
  borrowed: {
    type: Boolean,
    default: false,
  },
  // Name of the person who borrowed the book (empty string when not borrowed)
  borrower_name: {
    type: String,
    default: "",
  },
});

// Create a Mongoose model named 'Book' using the schema above.
// The model provides helper methods like `create`, `find`, `findById`, etc.
const Book = mongoose.model("Book", bookSchema);

// Export the model so other files (like `server.js`) can use it.
module.exports = Book;
