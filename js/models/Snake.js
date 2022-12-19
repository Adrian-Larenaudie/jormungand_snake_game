/* ------------------ IMPORTS ---------------- */
import { grid } from '../utils/grid.js';
/* ------------------ IMPORTS ---------------- */


export class Snake {
    /* ------------------ PROPRIETES ---------------- */
    body_cordinates = [ 
        {x: (grid.size * 4) + (grid.border * 5), y: (grid.size * 1) + (grid.border * 2)},
        {x: (grid.size * 3) + (grid.border * 4), y: (grid.size * 1) + (grid.border * 2)},
        {x: (grid.size * 2) + (grid.border * 3), y: (grid.size * 1) + (grid.border * 2)},
        {x: (grid.size * 1) + (grid.border * 2), y: (grid.size * 1) + (grid.border * 2)},
    ];
    colors = {head: "#00561B", body: "#096a09"};
    body_size = grid.size;
    direction = "right";
    mouvement_speed = 180;
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    draw = () => {
        this.body_cordinates.forEach((body_cordinate, index) => {
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            index === 0 ?   ctx.fillStyle = this.colors.head : ctx.fillStyle = this.colors.body;
            ctx.fillRect( body_cordinate.x, body_cordinate.y, this.body_size, this.body_size);
        })
    };

    update_cordinates = (last_head_cordinates) => {
        const count = this.body_cordinates.length - 1;
        for (let index = count; index >= 0; index--) {
            if(index === 1) {
                this.body_cordinates[index] = last_head_cordinates;
            } else if (index !== 0) {
                this.body_cordinates[index] = this.body_cordinates[index -1];
            }
        };
    };
     /* ------------------- METHODES ----------------- */
};