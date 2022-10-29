//? La fonction principale du jeu:

import { draw_grid } from './utils/draw_grid.js';
import { snake } from './utils/snake.js';
import { user_input } from './utils/user_input.js';

const jormungand = () => {
    // on commence par dessiner la grille
    draw_grid();
    // puis on initie le serpent
    snake.init();
    // enfin on active la détection des inputs du user pour diriger le serpent ZQSD
    user_input();
};

// premier appel pour initier le programme
jormungand();