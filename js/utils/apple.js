/* ------------------ IMPORTS ---------------- */
import { game } from "../game.js";
import { grid } from './grid.js';
/* ------------------ IMPORTS ---------------- */

export const apple = {
    /* ------------------ PROPRIETES ---------------- */
    size: grid.size,
    color: "#dc143c",
    position: {x: null, y: null},
    x_case_number: grid.x_case_number,
    y_case_number: grid.y_case_number,
    border: grid.border,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    get: (timer) => {
        setTimeout(() => {
            apple.get_random_position(); 
        }, timer);
    },

    get_random_position: () => {
        const body_cordinates =  JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));
        const valid_apple_positions = JSON.parse(JSON.stringify([...grid.all_positions.slice()]));

        for (let body_position = 0; body_position < body_cordinates.length; body_position++) {
            for (let grid_position = 0; grid_position < valid_apple_positions.length; grid_position++) {
                if(valid_apple_positions[grid_position].x === body_cordinates[body_position].x && valid_apple_positions[grid_position].y === body_cordinates[body_position].y) {
                    valid_apple_positions.splice(grid_position, 1);
                }
            };
        };

        //* petit log de controle de la taille des tableaux
   /*      console.log(body_cordinates.length);
        console.log(valid_apple_positions.length); */

        const random_position = valid_apple_positions[Math.floor(Math.random() * valid_apple_positions.length)];
        apple.position.x = random_position.x;
        apple.position.y = random_position.y;
        apple.draw();
    },

    draw: () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = apple.color;
        if(apple.position.x != null && apple.position.y != null) {
            ctx.fillRect( apple.position.x, apple.position.y, apple.size, apple.size);
        }
    },
    /* ------------------- METHODES ----------------- */
};