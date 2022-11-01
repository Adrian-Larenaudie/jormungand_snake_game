//* on a besoin des informations concernant les dimension de la grille
import { grid } from '../utils/grid.js';

//* définition d'une classe pour gérer notre serpent
export class Snake {
    //* les coordonnées de chaque parties du corps du serpent dans un tableau l'index 0 représente la tête
    body_cordinates = [ {x: 165, y: 42}, {x: 124, y: 42}, {x: 83, y: 42}, {x: 42, y: 42} ];
    //* couleurs tête et parties du corps
    colors = {head: "#00561B", body: "#096a09"};
    //* la taille d'une partie du corps
    body_size = grid.size;
    //* la valeur de la direction du serpent par défaut vers la droite
    direction = "right";
    //* sa vitesse de déplacement en millisecondes
    mouvement_speed = 180;

    //* la méthode qui nous permet de dessiner le serpent elle parcourt tous les index du tableau et dessine un carré par rapport à sa position
    draw = () => {
        this.body_cordinates.forEach((body_cordinate, index) => {
            const canvas = document.querySelector('canvas');
            // on donne un context au canvas
            const ctx = canvas.getContext('2d');
            // on donne une couleur verte à notre partie du corps courante
            index === 0 ?   ctx.fillStyle = this.colors.head : ctx.fillStyle = this.colors.body;
            // puis une position
            ctx.fillRect( body_cordinate.x, body_cordinate.y, this.body_size, this.body_size);
        })
    };

    //* la méthode qui permet de mettre à jour les valeurs de chaque parties du corps du serpent sauf celle de la tête index 0
    update_cordinates = (last_head_cordinates) => {
        const count = this.body_cordinates.length - 1;
        //* en parcourant le tableau à l'envers on va pouvoir donner la valeur des coordonnées de l'élément précédant
        //* ainsi les parties du corps vont pouvoir se suivre
        for (let index = count; index >= 0; index--) {
            if(index === 1) {
                this.body_cordinates[index] = last_head_cordinates;
            } else if (index !== 0) {
                this.body_cordinates[index] = this.body_cordinates[index -1];
            }
        };
    };
}