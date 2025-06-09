# Group Expense Tracker

**A cool app to manage group expenses, settle balances, and keep everyone on the same page.**

## Features

- Create and manage groups
- Add expenses with per-user shares
- Track balances and settlements within groups
- Invite users to join groups via email
- View group balances and pending settlements

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Email Service:** Nodemailer (Gmail SMTP)
- **Authentication:** JWT + Middleware

## Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB running (local or cloud)
- Gmail account for sending emails (or any SMTP)

### Setup

1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/group-expense-tracker.git
   cd group-expense-tracker
````

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/group-expense-tracker
   JWT_SECRET=your_super_secret_key
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

4. Start the server

   ```bash
   npm run dev
   ```

5. Hit the API at

   ```
   http://localhost:5000/api
   ```

---

Let me know if you want a **frontend section**, **demo GIFs**, or even a **badge system** for your README. We can flex it up even more, king 🛠️👑
```
