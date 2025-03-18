# Forum-application-with-React-Javascript

This is a Forum Web Application.
Frontend: used React Vite
Backend: Node.js/Express
Database: SQLite

**Features**

- Create, update, and delete threads
- Sort threads by newest, username or number of comments
- Users can comment on each thread
- The threads are organized by **categories**.
- **SQLite database** for storing posts and users.

### **Frontend**

- React
- Vite
- React Router
- CSS

### **Backend**

- Node.js
- Express.js
- SQLite
- Better-SQLite3

---

## **📌 Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/Dalavan123/Forum-application-with-React-Javascript.git
cd assignment-forum-react

```

2️⃣ Backend Setup
sh
cd backend
npm install
npm start

3️⃣ Frontend Setup
sh
cd frontend
npm install
npm run dev

📌 Available Scripts
Backend
nodemon index.js → Starts the backend server.

Frontend
npm run dev → Starts the frontend development server.

📂 Project Structure

forum-app/
│── backend/
│ ├── package.json # Backend dependencies
│ ├── index.js # Starts the backend server
│ ├── forumRoutes.js # API routes
│ ├── forumController.js # Business logic
│ ├── forumModel.js # Database queries
│ ├── middleware/ # Validation & error handling
│ ├── forum.db # SQLite database
│── frontend/
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite config
│ ├── src/
│ │ ├── main.jsx # React entry file
│ │ ├── components/ # UI components
│ │ ├── views/ # Page views
│ │ ├── api/ # API requests
│ │ ├── context/ # Context API state
│ │ ├── styles/ # CSS files
│── README.md # This file
│── .gitignore # Git ignored files

📌 Notes

Further development possibilities:

Authentication → Right now anyone can post, edit, and delete.
Authentication → Implement possiblity to update and delete comment, buttons for update and delete comment are already there.
Database is local → No cloud storage.
Structure → Structure is kept simple and easy to further develop layout and styling further.
