const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  borrowed: {
    type: Boolean,
    default: false,
  },
  borrower_name: {
    type: String,
    default: "",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
