//* pour récupérer notre serpent on a besoin d'importer la fichier ou il est instancié
import { game } from "../game.js";
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
    //! TODO corriger le bug de génération de pomme:
    //? la pomme est générée selon un tableau de position qui prend mal en compte la totalité des possiblités
    //? si le serpent est trop long et qu'il recouvre tout l'axe x ou tout l'axe y la pomme ne pourra être générée car elle n'aura
    //? aucune coordonée soi t x soit y selon ce que le serpent recouvre
    // TODO la solution serait de rendre possible la génération de pomme sur l'entiereté des cases ou le serpent n'est pas présent
    get_random_position: () => {
        /* //* on va d'abord devoir générer un tableau avec toute les positions de départ possible sur l'axe des x (horizontal)
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
        apple.position.y = y_positions[Math.floor(Math.random()*y_positions.length)]; */

        //* on va déclarer un tableau qui contiendra les postions valident pour la pomme
        let valid_apple_positions = [];
        //* on va parcourir toutes les positions de la grille
        for (let position = 0; position < grid.all_positions.length; position++) {
            //* ce bouléen va nous dire si la position parcouru est parmi celle du serpent ou pas
            let is_snake_position = false;
            //* on va vérifier si cette position est présente dans le tableau des postions du serpent
            game.jormungand.body_cordinates.forEach((body_position) => {
                //* si au moins une des positions du serpent est identique à la position courante de la grille on change la valeur de notre booléen
                if(grid.all_positions[position] == body_position) {
                    is_snake_position = true;
                }
            });
            //* si le booléen est false on peu push la position dans le tableau des positions valide pour la génération de pomme
            if(!is_snake_position) {
                valid_apple_positions.push(grid.all_positions[position]);
            };
        }

        //* maintenant que nous avons un tableau de positions valide nous allons piocher un index aléatoirement pour s'en servir
        const random_position = valid_apple_positions[Math.floor(Math.random() * valid_apple_positions.length)];
        apple.position.x = random_position.x;
        apple.position.y = random_position.y;

        //*on peut dessiner notre pomme
        apple.draw();
        console.log(`
        x: ${apple.position.x}, 
        y: ${apple.position.y}, 
        pomme numéro: ${scoring.eaten_apples + 1}, 
        random_position : ${JSON.stringify(random_position)}, 
        `);
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