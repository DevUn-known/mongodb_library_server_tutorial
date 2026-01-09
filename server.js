const express = require("express");
const mongoose = require("mongoose");
const book = require("./book");

const app = express();

const MONGO_URI =
  "mongodb+srv://temp_user:tempPass@cluster0.u33em5h.mongodb.net/library?appName=Cluster0";

app.use(express.json());

app.get("/test_working", (req, res) => {
  res.send("The server is running properly");
});

// Create book route

app.post("/", async (req, res) => {
  try {
    const bookDetails = req.body;
    const createdBook = await book.create(bookDetails);
    res.status(201).send(createdBook);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Get all books route
app.get("/", async (req, res) => {
  const books = await book.find({});
  res.status(200).send(books);
});

// Get single book route
app.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  const foundBook = await book.findById(bookId);
  res.send(foundBook);
});

// Update single book route
app.patch("/:id", async (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;
  const updatedBook = await book.findByIdAndUpdate(bookId, updateData, {
    new: true,
  });
  res.send(updatedBook);
});

// Delete single book route
app.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  await book.findByIdAndDelete(bookId);
  res.send("Book deleted successfully");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.listen(3000, () => {
  console.log("Server started properly");
});
