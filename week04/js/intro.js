
/* ========================================
   WEEK 04 - INTRO PAGE JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.getElementById("start-quiz-button");

    if (startButton) {
        startButton.addEventListener("click", function () {

            // Start timer for Week 04
            localStorage.setItem(
                "frimQuizWeek04StartTime",
                Date.now()
            );

            // Reset previous Week 04 quiz data
            localStorage.removeItem("frimQuizWeek04Answers");
            localStorage.removeItem("frimQuizWeek04TimeTaken");

        });
    }

});