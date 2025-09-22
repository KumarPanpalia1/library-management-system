import express from "express";
import Book from "../models/book.model.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// CREATE book (protected)
router.post("/", protect, async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

// READ all with pagination and optional author filter
router.get("/", async (req, res) => {
  const { author, page = 1, limit = 5 } = req.query;
  const query = author ? { author: new RegExp(author, "i") } : {};
  const books = await Book.find(query).skip((page - 1) * limit).limit(parseInt(limit));
  const total = await Book.countDocuments(query);
  res.json({ total, page: parseInt(page), limit: parseInt(limit), books });
});

// READ one
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// UPDATE (protected)
router.put("/:id", protect, async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// DELETE (protected)
router.delete("/:id", protect, async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Deleted" });
});

export default router;
