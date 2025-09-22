import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/books.routes.js";
import cors from "cors";

dotenv.config();
console.log("JWT Secret:", process.env.JWT_SECRET);

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Test route
app.get("/", (req, res) => res.json({ message: "Library API running" }));

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 4000, () => console.log("Server running on port", process.env.PORT || 4000)))
  .catch(err => console.error(err));
