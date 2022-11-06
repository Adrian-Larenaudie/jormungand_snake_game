//* pour récupérer notre serpent on a besoin d'importer la fichier ou il est instancié
import { game } from "../game.js";
import { Snake } from "../models/Snake.js";
//* on a également besoin des informations concernant les dimension de la grille
import { grid } from './grid.js';

import { scoring } from './scoring.js';

//* ce fichier gère la partie création de pomme 
export const apple = {
    //* plusieurs propriétés pour définir notre pomme
    size: grid.size,
    color: "#dc143c",
    position: {x: null, y: null},
    x_case_number: grid.x_case_number,
    y_case_number: grid.y_case_number,
    border: grid.border,

    //* méthode qui permet de lancer la génération d'une pomme au bout d'un temps passé en paramètre
    get: (timer) => {
        setTimeout(() => {
            apple.get_random_position(); 
        }, timer);
    },

    //* la méthode qui nous permet de récupérer une position aléatoire pour la pomme
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

    //* méthode qui permet de dessiner la pomme
    draw: () => {
        const canvas = document.querySelector('canvas');
        //* on donne un context au canvas
        const ctx = canvas.getContext('2d');
        //* on donne une couleur verte à notre partie du corps courante
        ctx.fillStyle = apple.color;
        //* on vérifie que la 1ere pomme a bien été créee
        if(apple.position.x != null && apple.position.y != null) {
            ctx.fillRect( apple.position.x, apple.position.y, apple.size, apple.size);
        //* sinon on dessine une pomme intouchable
        } else {
            ctx.fillRect( 0, 0, 0, 0);
        }   
    },
};