# 📄 CORE-Google-docs-clone-MERN

A full-stack **Google Docs-inspired collaborative document editor** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application enables users to create, edit, organize, and collaborate on documents through a clean, responsive interface backed by a scalable and secure backend.

---

# ✨ Features

## 👤 User Features

* Secure User Authentication
* Create New Documents
* Edit Documents
* Rich Text Editing
* Real-time Collaboration
* Auto Save
* Document History
* Search Documents
* Share Documents
* Responsive User Interface

## ⚙️ Core Features

* JWT Authentication
* Protected Routes
* RESTful APIs
* Real-time Synchronization
* Responsive Design
* Error Handling
* Environment Variable Configuration
* Scalable Backend Architecture

---

# 🛠 Tech Stack

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3 / Tailwind CSS (if applicable)
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO (for real-time collaboration)
* bcrypt

---

# 📂 Project Structure

```text
CORE-Google-docs-clone-MERN
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/CORE-Google-docs-clone-MERN.git

cd CORE-Google-docs-clone-MERN
```

---

## Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm start
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

Configure the following:

* MongoDB Connection URI
* JWT Secret
* Client URL
* Socket Server Configuration (if applicable)

---

# 📸 Screenshots

Add screenshots after deployment.

* Login Page
* Dashboard
* Document Editor
* Shared Documents
* Document History
* User Profile
* Mobile View

---

# 📡 API Overview

Example endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/documents
POST   /api/documents
GET    /api/documents/:id
PUT    /api/documents/:id
DELETE /api/documents/:id

GET    /api/user/profile
```

---

# 📱 Responsive Design

* Desktop
* Tablet
* Mobile

---

# 🔒 Security

* JWT Authentication
* Protected Routes
* Password Hashing
* Input Validation
* Environment Variables
* Robust Error Handling

---

# 🚀 Future Improvements

* Comments & Suggestions
* Version History
* Offline Editing
* Document Templates
* Export to PDF & DOCX
* Rich Media Embedding
* AI Writing Assistant
* Dark Mode

---

# 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 🙏 Acknowledgment

This project is based on the **MERN-Stack-Projects** repository by **Kunal Tyagi** and has been modified and enhanced with UI improvements, improved project structure, additional functionality, performance optimizations, and backend refinements.

**Original Repository:**

https://github.com/kunaltyagi9/MERN-Stack-Projects
