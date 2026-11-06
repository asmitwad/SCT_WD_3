import { useState, useEffect } from "react";
import {
  Brain,
  Trophy,
  Clock,
  Layers,
  ArrowRight,
  ChevronLeft,
  Code,
  Palette,
  Globe,
  Atom,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
} from "lucide-react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showSetup, setShowSetup] = useState(false);
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questionCount, setQuestionCount] = useState(5);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(30);

  const [reviewAnswers, setReviewAnswers] = useState([]);
const [showReview, setShowReview] = useState(false);

  const categories = [
    { name: "All", icon: Layers },
    { name: "HTML", icon: Globe },
    { name: "CSS", icon: Palette },
    { name: "JavaScript", icon: Code },
    { name: "React", icon: Atom },
  ];
  

  const difficulties = ["Easy", "Medium", "Hard"];

  // Fetch questions from the backend
  const startQuiz = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        category: category,
        difficulty: difficulty,
        limit: questionCount,
      });

      const response = await fetch(
        `http://localhost:5000/api/questions?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        alert("No questions found for this selection!");
        return;
      }

      setQuestions(data);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setAnswerSubmitted(false);
      setIsQuizFinished(false);
      setTimeLeft(30);
      setIsQuizStarted(true);
      setShowSetup(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to load quiz questions!");
    } finally {
      setLoading(false);
    }
  };

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  // Get question text
  const getQuestionText = (question) => {
    return (
      question.question ||
      question.questionText ||
      question.text ||
      "Question not available"
    );
  };

  // Get options
  const getOptions = (question) => {
    return question.options || question.answers || question.choices || [];
  };

  // Get correct answer
  const getCorrectAnswer = (question) => {
    return (
      question.correctAnswer ??
      question.answer ??
      question.correct_option ??
      question.correctOption
    );
  };

  // Compare selected answer with correct answer
  const isCorrectAnswer = (selected, correct, options) => {
    if (selected === null || correct === undefined || correct === null) {
      return false;
    }

    // If correct answer is an option index
    if (typeof correct === "number") {
      return selected === correct || options[selected] === correct;
    }

    // If correct answer is a string
    const selectedValue = String(options[selected] ?? selected)
      .trim()
      .toLowerCase();

    const correctValue = String(correct).trim().toLowerCase();

    // Handle answers stored as A, B, C, D
    const optionLetter = String.fromCharCode(65 + selected);

    return (
      selectedValue === correctValue ||
      optionLetter.toLowerCase() === correctValue
    );
  };

  // Select an answer
  const handleAnswerSelect = (index) => {
    if (answerSubmitted) {
      return;
    }

    setSelectedAnswer(index);
  };

  // Submit answer
  const handleSubmitAnswer = () => {
  if (selectedAnswer === null || answerSubmitted) {
    return;
  }

  const options = getOptions(currentQuestion);
  const correctAnswer = getCorrectAnswer(currentQuestion);

  const correct = isCorrectAnswer(
    selectedAnswer,
    correctAnswer,
    options
  );

  if (correct) {
    setScore((previousScore) => previousScore + 1);
  }

  setReviewAnswers((previousAnswers) => [
    ...previousAnswers,
    {
      question: getQuestionText(currentQuestion),
      options: options,
      selectedAnswer: selectedAnswer,
      correctAnswer: correctAnswer,
      isCorrect: correct,
      timedOut: false,
    },
  ]);

  setAnswerSubmitted(true);
};

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setTimeLeft(30);
    } else {
      setIsQuizFinished(true);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!isQuizStarted || isQuizFinished || answerSubmitted) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) =>
        previousTime > 0 ? previousTime - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [
    isQuizStarted,
    isQuizFinished,
    answerSubmitted,
    currentQuestionIndex,
  ]);

  // Handle time running out
useEffect(() => {
  if (
    timeLeft !== 0 ||
    !isQuizStarted ||
    isQuizFinished ||
    answerSubmitted
  ) {
    return;
  }

  setReviewAnswers((previousAnswers) => [
    ...previousAnswers,
    {
      question: getQuestionText(currentQuestion),
      options: getOptions(currentQuestion),
      selectedAnswer: null,
      correctAnswer: getCorrectAnswer(currentQuestion),
      isCorrect: false,
      timedOut: true,
    },
  ]);

  setAnswerSubmitted(true);
}, [
  timeLeft,
  isQuizStarted,
  isQuizFinished,
  answerSubmitted,
  currentQuestion,
]);

  // Restart quiz
  const handleRestartQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setShowSetup(true);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setScore(0);
    setTimeLeft(30);
    setReviewAnswers([]);
setShowReview(false);
  };

  // Return to home screen
  const handleHome = () => {
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setShowSetup(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setScore(0);
    setTimeLeft(30);
    setReviewAnswers([]);
  setShowReview(false);
  };

  // Determine whether the selected answer is correct
  const currentOptions = currentQuestion
    ? getOptions(currentQuestion)
    : [];

  const correctAnswer = currentQuestion
    ? getCorrectAnswer(currentQuestion)
    : null;

  const selectedIsCorrect = currentQuestion
    ? isCorrectAnswer(
        selectedAnswer,
        correctAnswer,
        currentOptions
      )
    : false;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl">

        {/* Navbar */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Brain size={26} />
            </div>

            <h1 className="text-2xl font-bold">QuizMaster</h1>
          </div>

          <span className="text-slate-400 text-sm">
            Test Your Knowledge
          </span>
        </nav>

        {/* Home Screen */}
        {!showSetup && !isQuizStarted && (
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Section */}
            <div>
              <span className="inline-block bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm mb-6">
                🚀 Learn. Challenge. Improve.
              </span>

              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Challenge Your
                <span className="text-indigo-500">
                  {" "}Knowledge
                </span>
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Put your knowledge to the test with exciting quizzes.
                Choose your difficulty, answer questions, and discover
                how much you really know.
              </p>

              <button
                onClick={() => setShowSetup(true)}
                className="bg-indigo-600 hover:bg-indigo-500 transition-all px-8 py-4 rounded-xl font-semibold flex items-center gap-3"
              >
                Start Quiz
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Right Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <div className="bg-indigo-500/10 rounded-2xl p-6 mb-6 flex justify-center">
                <Brain size={100} className="text-indigo-500" />
              </div>

              <h3 className="text-2xl font-bold mb-6">
                Ready to Play?
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                  <Trophy className="text-yellow-400" size={24} />

                  <div>
                    <p className="font-semibold">Earn Points</p>
                    <p className="text-sm text-slate-400">
                      Get rewarded for correct answers
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                  <Clock className="text-green-400" size={24} />

                  <div>
                    <p className="font-semibold">Beat the Clock</p>
                    <p className="text-sm text-slate-400">
                      Challenge yourself with timed questions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                  <Layers className="text-purple-400" size={24} />

                  <div>
                    <p className="font-semibold">
                      Multiple Categories
                    </p>
                    <p className="text-sm text-slate-400">
                      Explore different knowledge areas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Setup Screen */}
        {showSetup && !isQuizStarted && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10">

            <button
              onClick={() => setShowSetup(false)}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
            >
              <ChevronLeft size={20} />
              Back to Home
            </button>

            <h2 className="text-3xl font-bold mb-2">
              Configure Your Quiz
            </h2>

            <p className="text-slate-400 mb-8">
              Customize your quiz experience before you begin.
            </p>

            {/* Category Selection */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">
                Select Category
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => setCategory(item.name)}
                      className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-3 ${
                        category === item.name
                          ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                          : "border-slate-700 bg-slate-800 hover:border-slate-500"
                      }`}
                    >
                      <Icon size={24} />

                      <span className="font-medium">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">
                Select Difficulty
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-4 rounded-xl border transition-all ${
                      difficulty === level
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                        : "border-slate-700 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">
                  Number of Questions
                </h3>

                <span className="text-indigo-400 font-bold">
                  {questionCount}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={questionCount}
                onChange={(event) =>
                  setQuestionCount(Number(event.target.value))
                }
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Start Button */}
            <button
              onClick={startQuiz}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 transition-all p-4 rounded-xl font-semibold flex items-center justify-center gap-3"
            >
              {loading ? "Loading Questions..." : "Start Quiz"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </div>
        )}

        {/* Quiz Gameplay Screen */}
        {isQuizStarted && !isQuizFinished && currentQuestion && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10">

            {/* Quiz Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-slate-400 text-sm">
                  Question
                </p>

                <h2 className="text-2xl font-bold">
                  {currentQuestionIndex + 1} / {questions.length}
                </h2>
              </div>

              {/* Timer and Score */}
              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-2 rounded-xl font-semibold ${
                    timeLeft <= 10
                      ? "bg-red-500/10 text-red-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  <Clock size={18} className="inline mr-2" />
                  {timeLeft}s
                </div>

                <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl font-semibold">
                  Score: {score}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mb-8">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold leading-relaxed mb-8">
              {getQuestionText(currentQuestion)}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {currentOptions.map((option, index) => {
                const optionText =
                  typeof option === "object"
                    ? option.text || option.option || option.label
                    : option;

                const isSelected = selectedAnswer === index;

                const isCorrectOption =
                  answerSubmitted &&
                  isCorrectAnswer(index, correctAnswer, currentOptions);

                const isWrongSelected =
                  answerSubmitted &&
                  isSelected &&
                  !selectedIsCorrect;

                let optionClass =
                  "border-slate-700 bg-slate-800 hover:border-indigo-500";

                if (isSelected && !answerSubmitted) {
                  optionClass =
                    "border-indigo-500 bg-indigo-500/10";
                }

                if (isCorrectOption) {
                  optionClass =
                    "border-green-500 bg-green-500/10";
                }

                if (isWrongSelected) {
                  optionClass =
                    "border-red-500 bg-red-500/10";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answerSubmitted}
                    className={`w-full p-5 rounded-xl border transition-all flex items-center justify-between text-left ${optionClass}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span className="font-medium">
                        {optionText}
                      </span>
                    </div>

                    {isCorrectOption && (
                      <CheckCircle className="text-green-400" />
                    )}

                    {isWrongSelected && (
                      <XCircle className="text-red-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback */}
{answerSubmitted && (
  <div
    className={`p-4 rounded-xl mb-6 ${
      timeLeft === 0
        ? "bg-red-500/10 text-red-400"
        : selectedIsCorrect
        ? "bg-green-500/10 text-green-400"
        : "bg-red-500/10 text-red-400"
    }`}
  >
    <p className="font-semibold">
      {timeLeft === 0
        ? "Time's Up! ⏰"
        : selectedIsCorrect
        ? "Correct Answer! 🎉"
        : "Incorrect Answer!"}
    </p>

    <p className="mt-2 text-sm">
      Correct Answer:{" "}
      {typeof correctAnswer === "number"
        ? currentOptions[correctAnswer]
        : correctAnswer}
    </p>
  </div>
)}

            {/* Submit / Next Button */}
            {!answerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 transition-all p-4 rounded-xl font-semibold"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-indigo-600 hover:bg-indigo-500 transition-all p-4 rounded-xl font-semibold flex items-center justify-center gap-3"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "View Results"
                  : "Next Question"}

                <ArrowRight size={20} />
              </button>
            )}
          </div>
        )}

        {/* Results Screen */}
        {isQuizFinished && !showReview && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 text-center">

            <div className="bg-indigo-500/10 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
              <Trophy size={48} className="text-yellow-400" />
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Quiz Completed!
            </h2>

            <p className="text-slate-400 text-lg mb-8">
              Great job! You have completed your quiz.
            </p>

            <div className="bg-slate-800 rounded-2xl p-8 mb-8">
              <p className="text-slate-400 mb-2">
                Your Final Score
              </p>

              <h3 className="text-5xl font-bold text-indigo-400 mb-4">
                {score} / {questions.length}
              </h3>

              <p className="text-xl font-semibold">
                {Math.round((score / questions.length) * 100)}%
              </p>

              <p className="text-slate-400 mt-4">
                {score === questions.length
                  ? "Perfect Score! Amazing work! 🏆"
                  : score >= questions.length / 2
                  ? "Well done! Keep improving! 🎉"
                  : "Keep practicing. You can do better! 💪"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRestartQuiz}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 transition-all p-4 rounded-xl font-semibold flex items-center justify-center gap-3"
              >
                <RotateCcw size={20} />
                Play Again
              </button>

              <button
                onClick={handleHome}
                className="flex-1 bg-slate-800 hover:bg-slate-700 transition-all p-4 rounded-xl font-semibold flex items-center justify-center gap-3"
              >
                <Home size={20} />
                Home
              </button>

              <button
  onClick={() => setShowReview(true)}
  className="flex-1 bg-purple-600 hover:bg-purple-500 transition-all p-4 rounded-xl font-semibold"
>
  Review Answers
</button>
            </div>
          </div>
        )}

      </div>

{/* Review Answers Screen */}
{isQuizFinished && showReview && (
  <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10">

    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold">
        Review Answers
      </h2>

      <button
        onClick={() => setShowReview(false)}
        className="text-slate-400 hover:text-white flex items-center gap-2"
      >
        <ChevronLeft size={20} />
        Back to Results
      </button>
    </div>

    <div className="space-y-6">
      {reviewAnswers.map((item, index) => {
        const correctOptionIndex =
          typeof item.correctAnswer === "number"
            ? item.correctAnswer
            : item.options.findIndex(
                (option) =>
                  String(
                    typeof option === "object"
                      ? option.text || option.option || option.label
                      : option
                  ).trim().toLowerCase() ===
                  String(item.correctAnswer).trim().toLowerCase()
              );

        const correctOption = item.options[correctOptionIndex];

        const correctOptionText =
          typeof correctOption === "object"
            ? correctOption?.text ||
              correctOption?.option ||
              correctOption?.label
            : correctOption;

        const selectedOption = item.options[item.selectedAnswer];

        const selectedOptionText =
          typeof selectedOption === "object"
            ? selectedOption?.text ||
              selectedOption?.option ||
              selectedOption?.label
            : selectedOption;

        return (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6"
          >
            <p className="text-slate-400 text-sm mb-2">
              Question {index + 1}
            </p>

            <h3 className="font-semibold text-lg mb-4">
              {item.question}
            </h3>

            <p className="text-red-400 mb-2">
              Your Answer:{" "}
              {item.timedOut
                ? "Not Answered (Time's Up)"
                : selectedOptionText}
            </p>

            <p className="text-green-400 mb-3">
              Correct Answer: {correctOptionText}
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-lg text-sm ${
                item.isCorrect
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {item.isCorrect ? "Correct" : "Incorrect"}
            </span>
          </div>
        );
      })}
    </div>
  </div>
)}

    </div>
  );
}

export default App;