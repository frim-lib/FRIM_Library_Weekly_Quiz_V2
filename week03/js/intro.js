/* ========================================
   WEEK 03 - INTRO PAGE JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.getElementById("start-quiz-button");

    if (startButton) {
        startButton.addEventListener("click", function () {

            // Start timer for Week 03
            localStorage.setItem(
                "frimQuizWeek03StartTime",
                Date.now()
            );

            // Reset previous Week 03 quiz data
            localStorage.removeItem("frimQuizWeek03Answers");
            localStorage.removeItem("frimQuizWeek03TimeTaken");

        });
    }

});