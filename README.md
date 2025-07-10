# NC News Frontend

This is the **React frontend** for NC News — a Reddit-style article app where users can browse topics, read articles, vote, and comment.

🟢 Live Site: [https://ncnewscn.netlify.app](https://ncnewscn.netlify.app)

---

## 🛠 Tech Stack

- React (with Vite)
- React Router
- Material UI (MUI)
- Deployed via Netlify

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Connor-North/NC-News-Frontend.git
   cd NC-News-Frontend
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   The server should now be running locally.

---

## 🔗 Backend API

This app communicates with the backend API hosted at:  
[https://nc-news-v7di.onrender.com](https://nc-news-v7di.onrender.com)

Backend repo: [https://github.com/Connor-North/NC-News-Backend](https://github.com/Connor-North/NC-News-Backend)

---

## 📁 Project Structure

- `/pages` – route views (HomePage, ArticlePage, etc.)
- `/components` – reusable UI components (ArticleCard, CommentForm, VoteButtons,etc.)
- `App.jsx` – main app structure and routes
- `main.jsx` – entry point

---

## ✨ Features

- Browse all articles or filter by topic
- View full article details and comments
- Post comments and vote on articles
- Graceful error handling and loading states
