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

/*
*DOCUMENTATION FR

apple.js est le fichier qui contient l'objet apple et qui nous permet de gérer l'apparition des pommes sur la grille de jeu
en prenant soin qu'elles n'apparaissent pas sur le serpent en mouvement.
nous avons deux imports: game et grid puisque nous allons utiliser ces deux objets pour interagir avec leur état et le nôtre

*DESCRIPTION DES PROPRIETES: (6)
- size, reçoit la valeur numérique qui correspond à la taille d'une case de la grille
- color, reçoit une chaine de caractère qui contient une couleur hexadécimale pour colorer la pomme
- position, reçoit un objet avec deux valeurs x et y qui seront les positions de la pomme à générer
- x_case_number, reçoit la valeur numérique du nombre total de cases sur l'axe des x
- y_case_number, reçoit la valeur numérique du nombre total de cases sur l'axe des y
- border, reçoit la valeur numérique qui correspond à la taille de la bordure d'une case
*DESCRIPTION DES METHODES: (3)
- get(), nous permet d'appeler la méthode get_random_position() au bout d'un certain temps
- get_random_position(), permet à partir de deux tableaux: (un qui contient toutes les positions de la grille, 
un second qui contient toutes les positions du serpent) de trier le 1er en retirant les positions qui correspondent à celle du serpent:
    - on commence par faire une copie profonde de chacun des tableaux
    - on parcourt le tableau des coordonnées du serpent
        - dans lequel on va parcourir le tableau des positions de la grille
            - une condition va vérifier si la position de la grille courante est égal à celle de la position courante du corps du serpent
                - si c'est le cas on va retirer la position courante de la grille à l'aide la méthode splice(): 
                elle prend deux paramètre, 1er la valeur de l'index du tableau à retirer, 2eme le nombre d'éléments à retirer
    - une fois qu'on a fini de parcourir les tableaux on se retrouve avec un tableau des postions de la grille dans lequel 
    toutes les positions du serpent sont retirées
    - on va donc piocher la valeur d'un index aléatoirement dans ce tableau à l'aide de Math.random
    - on attribue la valeur x et la valeur y de cet index aux propriétés correspondantes
    - enfin on appelle la méthode draw()
- draw(), nous permet de dessiner la pomme
    - on stocke la balise cnavs dans une variable constante
    - on lui attribue un contexte 2d
    - on lui donne une couleur à l'aide de notre propriété color
    - si les positions de notre objet ne sont pas nulles on lui donne les bonnes coordonnées

*REMARQUE
pour éviter un clipping au niveau de la génération d'une pomme, on vérifie si les valeurs de la pomme ne sont pas nulles:
dans le fichier game.js ces valeurs nulles sont attribuées dans le cas suivant: une pomme est mangée par le serpent.
*/