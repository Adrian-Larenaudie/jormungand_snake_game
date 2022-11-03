//* pour récupérer notre serpent on a besoin d'importer la fichier ou il est instancié
import { game } from "../game.js";
//* on a également besoin des informations concernant les dimension de la grille
import { grid } from './grid.js';

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
        //* on va d'abord devoir générer un tableau avec toute les positions de départ possible sur l'axe des x (horizontal)
        let x_positions = [];
        //* on va avoir besoin de scinder en deux notre tableau de position du snake: un tableau pour les x et un pour les y
        let x_snake_positions = game.jormungand.body_cordinates.map(position => position.x);
        let y_snake_positions = game.jormungand.body_cordinates.map(position => position.y);

        for (let index = 0; index < apple.x_case_number; index++) {
            const position = apple.border + index + (index * apple.size)
            //* pour empêcher la pomme de poper sur le serpent on vérifie si la position courante est présente dans l'instance du serpent
            if(!x_snake_positions.includes(position)) {
                x_positions.push(position); 
            }
        }

        //* puis on va faire la même chose pour l'axe des y (vertical)
        let y_positions = [];
        for (let index = 0; index < apple.y_case_number; index++) {
            const position = apple.border + index + (index * apple.size)
            //* pour empêcher la pomme de poper sur le serpent on vérifie si la position courante est présente dans l'instance du serpent
            if(!y_snake_positions.includes(position)) {
                y_positions.push(position); 
            }
        }

        //* ensuite on va piocher aléatoirement une valeur dans chacun des tableaux et mettre à jour les valeur de apple.position
        apple.position.x = x_positions[Math.floor(Math.random()*x_positions.length)];
        apple.position.y = y_positions[Math.floor(Math.random()*y_positions.length)];
        //* puis jouer dessiner notre pomme
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