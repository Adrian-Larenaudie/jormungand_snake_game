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
        //* on commence par récupérer le tableau des position du serpent dans une constante en prennant soin créer une copie profonde 
        const body_cordinates =  JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));
        //* puis on récupére le tableau des positions de la grille en prennant soin créer une copie profonde 
        const valid_apple_positions = JSON.parse(JSON.stringify([...grid.all_positions.slice()]));

        //? on veut retirer de ce tableau tous les index qui sont égaux à ceux du tableau des positions du serpent   
        //* on va parcourir le tableau des position du serpent
        for (let body_position = 0; body_position < body_cordinates.length; body_position++) {
            //* pour chacune des positions du serpent on va pârcourir toutes les positions de la grille
            for (let grid_position = 0; grid_position < valid_apple_positions.length; grid_position++) {
                //* si on trouve une position du serpent identique à une position de la grille on va supprimer cette élément du tableau des positions de la grille
                if(valid_apple_positions[grid_position].x === body_cordinates[body_position].x && valid_apple_positions[grid_position].y === body_cordinates[body_position].y) {
                    valid_apple_positions.splice(grid_position, 1);
                }
            };
        };

        //* petit log de controle de la taille des tableaux
   /*      console.log(body_cordinates.length);
        console.log(valid_apple_positions.length); */

        //* maintenant que notre tableau des positions valides est bien mis à jour on va pouvoir piocher un index au hasard
        const random_position = valid_apple_positions[Math.floor(Math.random() * valid_apple_positions.length)];
        //* puis on met à jour les valeur de notre objet parent
        apple.position.x = random_position.x;
        apple.position.y = random_position.y;
        //*on peut dessiner notre pomme
        apple.draw();
    },

    draw: () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = apple.color;
        if(apple.position.x != null && apple.position.y != null) {
            ctx.fillRect( apple.position.x, apple.position.y, apple.size, apple.size);
        } else {
            ctx.fillRect( 0, 0, 0, 0);
        }   
    },
    /* ------------------- METHODES ----------------- */
};

/*
*DOCUMENTATION FR
*DESCRIPTION DES PROPRIETES: (6)
-
-
-
-
-
-
*DESCRIPTION DES METHODES: (3)
-
-
-
*/