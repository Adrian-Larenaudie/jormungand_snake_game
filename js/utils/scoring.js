export const scoring = {
    /* ------------------ PROPRIETES ---------------- */
    current_score_displayer: document.querySelector('.current_score_value'),
    best_score_displayer: document.querySelector('.best_score_value'),
    eaten_apples_displayer: document.querySelector('.eaten_apples_value'),
    eaten_apples: 0,
    current_score: 0,
    end_game_score: 0,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        scoring.get_best_score();
    },

    get_best_score: () => {
        if(localStorage.getItem("best_score")) {
            scoring.best_score_displayer.textContent = localStorage.getItem("best_score");
        }
    },

    set_best_score: () => {
        if(localStorage.getItem("best_score")) {
            if(localStorage.getItem("best_score") < scoring.current_score) {
                localStorage.setItem("best_score", scoring.current_score);
            }
        } else {
            localStorage.setItem("best_score", scoring.current_score);
        }
        scoring.end_game_score = scoring.current_score;
        scoring.current_score = 0;
        scoring.eaten_apples = 0;
        scoring.current_score_displayer.textContent = 0;
        scoring.eaten_apples_displayer.textContent = 0;
    },

    update_score: (array_of_snake_body_part) => {
        scoring.current_score+= array_of_snake_body_part.length * scoring.eaten_apples;
        scoring.current_score_displayer.textContent = scoring.current_score;
        scoring.eaten_apples_displayer.textContent = scoring.eaten_apples;
    },
    /* ------------------- METHODES ----------------- */
};