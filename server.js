// Basic library server using Express and Mongoose
// - Provides simple CRUD routes for a `Book` model
// - Intended as a beginner-friendly example

const express = require("express");
const mongoose = require("mongoose");
const book = require("./book");

const app = express();

// Replace this with your actual MongoDB connection string.
// For local development you might use: "mongodb://localhost:27017/library"
const MONGO_URI = "Your mongodb connection string here";

// Middleware: parse incoming JSON bodies into `req.body`
app.use(express.json());

// Health-check route to verify the server is running
app.get("/test_working", async (_req, res) => {
  try {
    // Sending a simple string is enough for a quick smoke test
    res.send("The server is running properly");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Create book route
// - Expects a JSON body with the book fields (e.g. title, author)
// - Uses Mongoose `create` which returns the saved document
app.post("/", async (req, res) => {
  try {
    const bookDetails = req.body;
    const createdBook = await book.create(bookDetails);
    // 201 (Created) is the conventional status for successful POST that creates
    res.status(201).send(createdBook);
  } catch (error) {
    // On error, return 500 (Internal Server Error) with the message
    return res.status(500).send({ message: error.message });
  }
});

// Get all books route
// - Returns an array of all book documents in the collection
app.get("/", async (_req, res) => {
  try {
    const books = await book.find({});
    res.status(200).send(books);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Get single book route
// - `:id` is a path parameter for the book's MongoDB _id
app.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const foundBook = await book.findById(bookId);
    // If not found, `foundBook` will be null — the client can check for that
    res.send(foundBook);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Update single book route
// - Partial updates are supported via `findByIdAndUpdate`
// - `new: true` returns the updated document instead of the original
app.patch("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateData = req.body;
    const updatedBook = await book.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });
    res.send(updatedBook);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Delete single book route
// - Deletes by id and returns a simple confirmation message
app.delete("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    await book.findByIdAndDelete(bookId);
    res.send("Book deleted successfully");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Connect to MongoDB using Mongoose
// - .connect returns a promise; we log success or failure
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Start the HTTP server on port 3000
app.listen(3000, () => {
  console.log("Server started properly");
});
