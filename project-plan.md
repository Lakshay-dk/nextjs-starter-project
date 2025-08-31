# Project Plan for ReadShelf

## 1. Setup Project Structure
- Create `frontend` and `backend` directories.
- Initialize both projects with `npm init`.

## 2. Frontend Development
- Set up Vite with React.
- Create components:
  - `BookForm`: For adding new books.
  - `BookList`: For displaying the list of books.
  - `Filter`: For filtering books based on read/unread status.
  - `Navbar`: For navigation.

- Implement API calls to the backend for CRUD operations.

## 3. Backend Development
- Set up Express.js server.
- Create API endpoints for CRUD operations:
  - `POST /api/books`: Add a new book.
  - `GET /api/books`: Get all books.
  - `PUT /api/books/:id`: Update a book.
  - `DELETE /api/books/:id`: Delete a book.

- Connect to MongoDB for data storage.

## 4. Testing
- Ensure all features work as expected.
- Write tests for both frontend and backend.

## 5. Run the Application
- Start both frontend and backend servers.
