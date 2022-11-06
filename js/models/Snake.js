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

/*
*DOCUMENTATION FR

Il s'agit du fichier qui contient la classe du serpent avec ses propriétés et ses méthodes
les propriétés permettent de définir un état et les méthodes de modifier cet état  

*DESCRIPTION DES PROPRIETES: (5)

- body_cordinates, un tableau qui contient les coordonnées du serpent prend une position sur la grille par defaut puis
- colors, un petit objet qui contient les couleurs du serpent
- body_size, prend la taille d'une case de la grille
- direction, prend une valeur définissant la direction du serpent par défaut vers la droite "right"
- mouvement_speed, prend une valeur numérique qui définit la vitesse du serpent en milliseconde

*DESCRIPTION DES METHODES: (2)

- draw(), permet de dessiner le serpent:
    - on va parcourir toutes les coordonnées du serpent et pour chaque coordonnées on va:
        - séléctionner la balise canvas
        - lui deonner un contexte 2d
        - à l'aide d'une ternaire si on se trouve à la position de la tête:
            - dessiner la tête avec la bonne couleur
            - sinon dessiner la partie du corps avec la bonne couleur

- update_cordinates(), permet de mettre à jour les coordonnées du serpent et prend un paramètre qui est la position de la tête avant son déplacement:
    - on va bouvler sur les coordonnées du corps mais en partant de la fin du tableau
        - si la partie du corps parcourut est celle suivant la tête
            - elle prend la position de la tête passée en paramètre (donc avant que la tête ne se déplace)
        - sinon si la partie parcourut n'est pas la tête 
            - elle prend la valeur de la position qui se trouve devant elle ici index - 1 puisque l'on parcourt le tableau à l'envers
            (cad de la fin vers le début)
*/