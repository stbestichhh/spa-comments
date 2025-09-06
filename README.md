# 🗨️ Comments SPA

A full-featured **SPA application for working with comments**, built with **NestJS (backend)** and **React + TypeScript (frontend)**.  
This project implements key requirements of a typical Junior+/Middle-level test task: authentication, comment management, XSS protection, nested replies, live updates, and file attachments.

---

## 🚀 Features

### 🔑 Authentication
- User registration and login (email + password).
- JWT-based authentication.
- Fetch current user (`/auth/me`).
- Session persistence via `localStorage`.

### 💬 Comments
- Create and view comments with **nested replies** (multi-level tree).
- Sorting by date, username, or email.
- Pagination (25 comments per page).
- **Real-time updates** via WebSocket (new comments appear instantly for all clients).

### 🔒 Security
- CAPTCHA verification when posting a comment.
- XSS filtering (only `<a>`, `<code>`, `<i>`, `<strong>` tags allowed).
- SQL Injection protection via ORM (Sequelize).

### ⚡ Technical Highlights
- Asynchronous file processing queue (without Redis).
- Caching and event handling (EventEmitter).
- Modular NestJS architecture.
- Dockerized environment (Postgres + Redis + Backend + Frontend).
- Frontend built with Vite and served via Nginx.

---

## 🛠️ Tech Stack
- **Backend:** NestJS, Sequelize, PostgreSQL, Redis, JWT, WebSocket  
- **Frontend:** React, TypeScript, Axios, Socket.IO client  
- **DevOps:** Docker, Docker Compose, Nginx  

---

## ⚙️ How to Run

1. Clone the repository.  
2. Build and run containers:  
   ```bash
   docker-compose up --build
3. Open in browser:

Backend API → http://localhost:3000

Frontend SPA → http://localhost:8080
