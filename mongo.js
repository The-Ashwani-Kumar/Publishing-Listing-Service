// model.jsx

import mongoose from "mongoose";

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/publishingListingService")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

// Define Schema
const loginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const publishSchema = new mongoose.Schema({
  bookname: { type: String, required: true },
  authorname: { type: String, required: true },
  genre: { type: String, required: true },
  publisher: { type: String, required: true },
  price: { type: String, required: true },
  language: { type: String, required: true },
  pagecount: { type: String, required: true },
  isbn: { type: String },
  publishdate: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isValid: { type: Boolean, required: true },
  userID: { type: String, required: true },
});

// Define your models
const logincollection = mongoose.model("login", loginSchema);
const publishcollection = mongoose.model("publish", publishSchema);

// Export the collections
export { logincollection, publishcollection };
