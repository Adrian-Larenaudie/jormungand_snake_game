/* ------------------ IMPORTS ---------------- */
import { Snake } from './models/Snake.js';
import { index } from './index.js';
import { grid } from './utils/grid.js';
import { apple } from './utils/apple.js';
import { scoring } from './utils/scoring.js';
import { song } from './utils/song.js';
/* ------------------ IMPORTS ---------------- */

export const game = {
    /* ------------------ PROPRIETES ---------------- */
    running: false,
    over: false,
    jormungand: null,
    interval: null,
    button: document.querySelector('.launch_button'),
    modal: document.querySelector('.modal'),
    pause_modal: document.querySelector('.modal_pause'),
    pause: false,
    last_direction: "right",
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {   
        game.running = false,    
        song.init();
        scoring.init();
        grid.draw();
        game.jormungand = new Snake;
        game.jormungand.draw();  
        game.modal.style.visibility = 'visible'; 
        game.button.addEventListener('click', (event) => {
            game.running = true,  
            game.modal.style.visibility = 'hidden';
            game.launch_game();
        });     
    },

    launch_game: () => {
        game.over = false;
        clearInterval(game.interval);
        game.user_input();
        game.interval = setInterval(game.on_move, game.jormungand.mouvement_speed);
        apple.get(0);       
    },

    user_input: () => {
        document.addEventListener('keypress', game.user_input_handler, true);
    },

    remove_user_input: () => {
        document.removeEventListener('keypress', game.user_input_handler, true);
    },

    user_input_handler: (event) => {
        if(!game.over) {
            switch (event.key) {
                case "z":
                    if(game.jormungand.direction != "bottom" && !game.pause) {
                        game.jormungand.direction = "top";
                        game.last_direction = "top";
                    }
                    break;
                case "q":
                    if(game.jormungand.direction != "right" && !game.pause) {
                        game.jormungand.direction =  "left";
                        game.last_direction = "left";
                    }
                    break;
                case "s":
                    if(game.jormungand.direction != "top" && !game.pause) {
                        game.jormungand.direction =  "bottom";
                        game.last_direction = "bottom";
                    }
                    break;
                case "d":
                    if(game.jormungand.direction != "left" && !game.pause) {
                        game.jormungand.direction =  "right";
                        game.last_direction = "right";
                    }
                    break;
                case " ":
                    index.manage_pause(false);
                break;
            };
        }     
    },

    on_move: () => {       
        const body_cordinates_copy = JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));
        const last_head_position = body_cordinates_copy[0];
        
        switch (game.jormungand.direction) {
            case 'right':
                //? taile de la grille x le nombre de case + le total des bordures - taille de la grille + bordure
                if(game.jormungand.body_cordinates[0].x < (grid.size * grid.x_case_number + (grid.x_case_number * grid.border)) - (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].x += (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].x = grid.border; 
                }
                break;
            case 'left':
                if(game.jormungand.body_cordinates[0].x > (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].x -= (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].x = (grid.size * grid.x_case_number + (grid.x_case_number * grid.border)) - (grid.size); 
                }
                break;
            case 'top':
                if(game.jormungand.body_cordinates[0].y > (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].y -= (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].y = (grid.size * grid.y_case_number + (grid.y_case_number * grid.border)) - (grid.size);
                }
                break;
            case 'bottom':
                if(game.jormungand.body_cordinates[0].y < (grid.size * grid.y_case_number + (grid.y_case_number * grid.border)) - (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].y += (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].y = grid.border;
                }
                break;
        };

        if(game.jormungand.body_cordinates[0].y === apple.position.y && game.jormungand.body_cordinates[0].x === apple.position.x) {
            apple.position.x = null;
            apple.position.y = null;
            song.eaten_apple();
            apple.get(100);
            game.jormungand.body_cordinates.push(JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]))[0]);
            scoring.eaten_apples++;
            scoring.update_score(game.jormungand.body_cordinates);
        };
        game.jormungand.update_cordinates(last_head_position);
        game.check_if_bit_himself();

        if(game.over) {
           game.end_game();
        } else {
            grid.draw();
            apple.draw();
            game.jormungand.draw();     
        }
              
    },

    check_if_bit_himself: () => {
        game.jormungand.body_cordinates.forEach((body_part, index) => {
            if(index != 0 && body_part.x === game.jormungand.body_cordinates[0].x && body_part.y === game.jormungand.body_cordinates[0].y) {
                game.over = true;
            }
        })
    },

    end_game: () => {
        game.remove_user_input();
        clearInterval(game.interval);
        scoring.set_best_score();
        document.querySelector('.modal_title').textContent = 'Game Over!';
        document.querySelector('.end_game_score').textContent = 'score: ' + scoring.end_game_score;
        game.init();
    },
    /* ------------------- METHODES ----------------- */
};
