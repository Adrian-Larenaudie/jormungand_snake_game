//? La fonction principale du jeu:

import { draw_grid } from './utils/draw_grid.js';
import { draw_snake_head } from './utils/draw_snake_head.js';

const jormungand = () => {
    console.log('hello world');
    draw_grid();
    draw_snake_head();
};

jormungand();