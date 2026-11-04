
/* ========================================
   FRIM WEEKLY QUIZ - WEEK 02
   Quiz Interaction
======================================== */

// ========================================
// SOUND EFFECTS
// ========================================

const clickSound = new Audio("../sounds/click.mp3");
const correctSound = new Audio("../sounds/correct.mp3");
const wrongSound = new Audio("../sounds/wrong.mp3");

// ========================================
// BUTTON CLICK SOUND
// ========================================

document.addEventListener("click", event => {
    const clickedButton = event.target.closest("button, a");

    if (!clickedButton) {
        return;
    }

    // Answer options play their own click sound
    if (clickedButton.classList.contains("answer-option")) {
        return;
    }

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
});

// ========================================
// CURRENT PAGE
// ========================================

const currentPage = window.location.pathname.split("/").pop();

// ========================================
// QUIZ TIMER - WEEK 02
// ========================================

const timerStartKey = "frimQuizWeek02StartTime";
const timerDurationKey = "frimQuizWeek02TimeTaken";
const answersStorageKey = "frimQuizWeek02Answers";

// Reset Week 02 timer and answers on Q1
if (currentPage === "index.html") {
    localStorage.removeItem(timerStartKey);
    localStorage.removeItem(timerDurationKey);
    localStorage.removeItem(answersStorageKey);
}

// ========================================
// CORRECT ANSWERS - WEEK 02
// ========================================

const correctAnswers = {
    "index.html": "A",
    "q2.html": "B",
    "q3.html": "C"
};

const correctAnswer = correctAnswers[currentPage];

// ========================================
// ANSWER OPTIONS
// ========================================

const answerOptions = document.querySelectorAll(".answer-option");
const submitButton = document.getElementById("submit-button");

// ========================================
// SELECT ANSWER
// ========================================

answerOptions.forEach(option => {
    option.addEventListener("click", () => {

        // Start timer when the player first selects an answer on Q1
        if (
            currentPage === "index.html" &&
            !localStorage.getItem(timerStartKey)
        ) {
            localStorage.setItem(timerStartKey, String(Date.now()));
        }

        // Remove previous selection
        answerOptions.forEach(item => {
            item.classList.remove("selected");
        });

        // Select current answer
        option.classList.add("selected");

        // Play click sound
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    });
});

// ========================================
// SUBMIT ANSWER
// ========================================

if (submitButton) {
    submitButton.addEventListener("click", () => {

        const selectedOption =
            document.querySelector(".answer-option.selected");

        // No answer selected
        if (!selectedOption) {
            alert("Please select an answer first.");
            return;
        }

        const selectedAnswer = selectedOption.dataset.answer;

        // ========================================
        // SAVE ANSWER FOR WEEK 02
        // ========================================

        const questionNumbers = {
            "index.html": "1",
            "q2.html": "2",
            "q3.html": "3"
        };

        const questionNumber = questionNumbers[currentPage];

        if (questionNumber) {
            let savedAnswers = {};

            try {
                savedAnswers = JSON.parse(
                    localStorage.getItem(answersStorageKey) || "{}"
                );
            } catch (error) {
                savedAnswers = {};
            }

            savedAnswers[questionNumber] = selectedAnswer;

            localStorage.setItem(
                answersStorageKey,
                JSON.stringify(savedAnswers)
            );
        }

        // ========================================
        // REDIRECT AFTER SUBMISSION
        // ========================================

        const questionId = questionNumbers[currentPage];

        if (!questionId || !correctAnswer) {
            alert("Question configuration error. Please contact the quiz administrator.");
            return;
        }

        const isCorrect = selectedAnswer === correctAnswer;

        const destination = isCorrect
            ? `correct_q${questionId}.html`
            : `wrong_q${questionId}.html`;

        const sound = isCorrect ? correctSound : wrongSound;

        sound.currentTime = 0;

        sound.play()
            .catch(() => {})
            .finally(() => {
                setTimeout(() => {
                    window.location.href = destination;
                }, 500);
            });
    });
}
