
# 🌟 Donation Dashboard Web App

A full-stack web application that allows users to:
- Track their **total donations**
- View a **leaderboard** of top contributors
- Manage donations
- Use unique **referral codes**
- Earn **rewards** based on milestones

Built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 📁 Project Structure

```
/frontend      → React frontend
/backend      → Express backend
```

---

## 🚀 Features

- 👤 User login/signup (email stored locally)
- 💰 Edit total donations
- 🏆 Leaderboard highlighting current user
- 🎁 Rewards & unlockables for donation milestones
- 🔐 Referral codes stored per user

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/vidyabhandari/intern-dashboard.git
cd intern-dashboard
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### 🔧 Create a `.env` file in `server/` with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### 🚀 Start the backend

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### 🔧 Create a `.env` file in `client/` with:

```env
VITE_BACKEND_URL=http://localhost:5000
```

#### 🚀 Start the frontend

```bash
npm run dev
```

---

## 🌍 API Endpoints

| Method | Route                        | Description                 |
|--------|------------------------------|-----------------------------|
| GET    | `/api/dashboard/:email`      | Get user data by email      |
| PUT    | `/api/user/update-donations` | Update user donations       |
| GET    | `/api/user/all`              | Get all users (leaderboard) |

---

## 🧾 Tech Stack

- **Frontend**: React + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Notifications**: React Toastify
- **Routing**: React Router

---

## 📸 Screenshots

> You can insert screenshots here later using:
```
![loginPage](Screenshots\loginPage.png)
![singupPage](Screenshots\signupPage.png)
![userForm](Screenshots\userForm.png)
![internDashboard](Screenshots\internDashboard.png)
![donationEdit](Screenshots\donationEdit.png)
![leaederboard](Screenshots\learderBoard.png)

```

---

## 🛠️ To-Do / Improvements

- Add user authentication (e.g., JWT)
- Add reward unlock logic on backend
- Make leaderboard paginated
- Add dark mode

---

## 💬 Questions?

Feel free to open an issue or submit a PR.
