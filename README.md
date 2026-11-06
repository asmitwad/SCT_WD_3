# QuizMaster – Quiz Game Application

A full-stack interactive quiz application developed as Task 3 of the SkillCraft Technology Web Development Internship.

QuizMaster allows users to test their knowledge of HTML, CSS, JavaScript, and React through timed quizzes with multiple difficulty levels.

## Features

- Select quiz categories: HTML, CSS, JavaScript, and React
- Choose difficulty levels: Easy, Medium, and Hard
- Customize the number of questions (1–10)
- 30-second countdown timer for each question
- Interactive multiple-choice questions
- Instant answer feedback
- Automatic handling of unanswered questions when time runs out
- Score calculation and percentage display
- Review answers after quiz completion
- Play Again and Home navigation

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Project Structure

```text
Quiz_Game_App_Task3/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SCT_WD_3.git
cd SCT_WD_3
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Seed the database:

```bash
node seed.js
```

Start the backend server:

```bash
node server.js
```

The backend will run at:

`http://localhost:5000`

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local development URL provided by Vite in your browser.

## How to Use

1. Open QuizMaster.
2. Click Start Quiz.
3. Select a category and difficulty.
4. Choose the number of questions.
5. Answer each question before the timer expires.
6. Submit your answers and view your final score.
7. Review your answers to understand your mistakes.

## Internship Details

- **Organization:** SkillCraft Technology
- **Internship Track:** Web Development
- **Task Number:** 3
- **Project:** Quiz Game Application

## Author

Asmit Wad
