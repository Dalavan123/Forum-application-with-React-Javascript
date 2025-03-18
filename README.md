# Forum-application-with-React-Javascript

This is a Forum Web Application.
Frontend: used React Vite (Javascript)
Backend: Node.js/Express
Database: SQLite

### **Features**

- Create, update, and delete threads
- Sort threads by newest, username or number of comments
- Users can comment on each thread
- The threads are organized by **categories**.
- **SQLite database** for storing posts and users.

### **Frontend**

- React Javascript
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

Create a folder where you want to save the app, open it in VS code.
Open the terminal for the projects root and run:

```sh
git clone https://github.com/Dalavan123/Forum-application-with-React-Javascript.git
cd assignment-forum-react

```

2️⃣ Backend Setup

- In terminal from root directory run:
- cd backend
- npm install (to install node_modules since they are ignored to git)
- nodemon index.js (starts the backend server)

3️⃣ Frontend Setup

- In a separate terminal from root directory run:
  cd frontend
  npm install (to install node_modules since they are ignored to git)
  npm run dev (starting the frontend client)

## 📂 Project Structure

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

- **Authentication** → Right now anyone can post, edit, and delete.
- **Comments Management** → Implement possiblity to update and delete comment, buttons for update and delete comment are already there.
- **Database is local** → No cloud storage.
- **UI Structure** → Layout is kept simple, ready for further styling and improvements.
