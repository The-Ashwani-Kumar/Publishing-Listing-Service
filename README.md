# Publication Website

## Overview
This is a full-stack **Publication Website** that allows users to manage and store book details using the **Google Books API**. The platform enables publishers to **publish, edit, and delete books**, with an admin system in place for **moderation and quality control**.

## Features
- **User Management**: Allows publishers to create, update, and delete book entries.
- **Admin Approval System**: Ensures quality control by moderating published content.
- **Google Books API Integration**: Fetches book details seamlessly.
- **Full-Stack Implementation**: Built with ReactJS, Node.js, ExpressJS, and MongoDB.

## Tech Stack
- **Frontend**: ReactJS
- **Backend**: Node.js, ExpressJS
- **Database**: MongoDB
- **External API**: Google Books API

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (running locally or via Atlas)

### Steps to Run Locally
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/publication-website.git
   cd publication-website
   ```
2. **Install dependencies**
   ```sh
   npm install
   cd client
   npm install
   ```
3. **Setup environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   PORT=5000
   ```
4. **Run the backend**
   ```sh
   npm run server
   ```
5. **Run the frontend**
   ```sh
   cd client
   npm start
   ```

## API Endpoints
| Method | Endpoint         | Description                      |
|--------|-----------------|----------------------------------|
| GET    | `/api/books`     | Fetch all books                 |
| POST   | `/api/books`     | Add a new book (Publisher)      |
| PUT    | `/api/books/:id` | Edit book details (Publisher)   |
| DELETE | `/api/books/:id` | Delete a book (Publisher)       |
| GET    | `/api/admin/books` | Fetch books pending approval |
| PUT    | `/api/admin/books/:id` | Approve/Reject books (Admin) |

## Contribution
1. **Fork the repository**
2. **Create a feature branch**
   ```sh
   git checkout -b feature-name
   ```
3. **Commit your changes**
   ```sh
   git commit -m "Added new feature"
   ```
4. **Push to GitHub and open a Pull Request**
   ```sh
   git push origin feature-name
   ```

### To run program : npm run dev
### To run mongo : node app.js

