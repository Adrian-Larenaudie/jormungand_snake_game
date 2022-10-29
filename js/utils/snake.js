// on va avoir besoin de redessiner la grille fréquemment d'ou son import
import { draw_grid } from './draw_grid.js';

// cette objet contient notre serpent avec une partie propriétés et méthodes
export const snake = {
    //--------------- PROPRIETES ----------------- //
    // on définit les propriétés de la tête du serpent
    head: {
        size: 40,
        color: "#00561B",
        direction: "right",
        position: {
            // sur l'axe horizontale
            x: 1,
            // sur l'axe verticale
            y: 1,
        }
    },
    timeout: false,
    // la vitesse de déplacement du serpent: une case toute les x millisecondes
    mouvement_speed: 200,
    // prendra le setInterval() pour valeur, définit ici pour un accès global dans l'objet snake
    interval: null,
    //--------------- PROPRIETES ----------------- //

    // -------------- METHODES --------------------//
    // pour initier notre serpent
    init: () => {
        // on dessine d'abord une première fois sa tête
        snake.draw_head();
        // puis on active son déplacement
        snake.on_move();
    },

    // pour dessiner la tête du serpent
    draw_head: () => {
        draw_grid();
        // balise canvas
        const canvas = document.querySelector('canvas');
        // on donne un context au canvas, (le jeu sera en 2d)
        const ctx = canvas.getContext('2d');
        // on donne une couleur verte à notre tête de serpent
        ctx.fillStyle = '#00561B';
        // puis une position
        ctx.fillRect(snake.head.position.x, snake.head.position.y, snake.head.size, snake.head.size);
    },

    // pour déplacer le serpent
    on_move: () => { 
        snake.interval = setInterval(() => {
            switch (snake.head.direction) {
                case 'right':
                    if(snake.head.position.x < 1107 - 41) {
                        snake.head.position.x+= 41;
                    } else {
                        snake.head.position.x = 1; 
                    }
                    break;
                case 'left':
                    if(snake.head.position.x > 41) {
                        snake.head.position.x-= 41;
                    } else {
                        snake.head.position.x = 1108; 
                    }
                    break;
                case 'top':
                    if(snake.head.position.y > 41) {
                        snake.head.position.y-= 41;
                    } else {
                        snake.head.position.y = 698;
                    }
                    break;
                case 'bottom':
                    if(snake.head.position.y < 697 - 41) {
                        snake.head.position.y+= 41;
                    } else {
                        snake.head.position.y = 1;
                    }
                    break;
            };  
            snake.draw_head();     
        }, snake.mouvement_speed);

      /*  setTimeout(() => {
            snake.stop_move();
        }, 5000); */
    },

    // pour arreter le serpent
    stop_move: () => {
        clearInterval(snake.interval);
    },
    // -------------- METHODES --------------------//
    
};

// IMAGINONS: que l'axe des x soit gradué de lettre et que l'axe des y soit gradué de chiffre
// la position A1 correspond à la toute première case en pramètre de la méthode fillRect on aurait (1,1,40,40)
// sur la position A2 ce serait fillRect(1, 42, 40, 40)
//! ON REMARQUE que pour se déplacer d'une case il faut ajouter 41 à la valeur soit x soit y
// ce qui veut dire que si on veut avancer vers la droite de 1 case il faut ajouter 41 à la valeur de x
// si on veut avancer vers le bas il faut ajouter 41 à la valeur de y
// et inversement si on veut avancer vers le haut de 1 case il faut retirer 41 à la valeur de y
// et pour finir si on veut avancer vers la gauche de 1 case il faut retirer 41 à la valeur de x

//! REGLE IMPORTANTE: chaque fois qu'un déplacement est fait, tout le canvas doit être rédessinné:
    //? cela se traduit dans le code, par un appel de la méthode draw_head(); et de la fonction draw_grid(); pour chaque déplacement

//! EVITER LES DEBORDEMENTS:
    //? on ne veut pas que le serpent puisse sortir du canvas: 
    //? il va donc falloir rajouter des conditions pour limiter le déplacement dans un certain interval
    // x ne peut pas être inférieur à 1 et il ne peut pas être supérieur à 1107
    // y ne peut pas être inférieur à 1 également et il ne peut pas être supérieur à 697
    // ces valeurs ne sont pas prise au hasard puisqu'il s'agit tout simplement des dimensions du canvas + ou - 1 pour respecter les bordures
    // si on entre dans le cas ou le serpent arrive sur une bordure il sera stoppé
    //? le comportement que l'ont souhaite c'est que le serpent se retrouve de l'autre coté du canvas dans le cas ou il arrive sur une bordure
    // on va donc ajouter un else qui nous permet de dire si tu arrives en bordure tu prend pour coordonée celle de la case opposée


//! CHANGER LA DIRECTION
    //? pour changer la direction on va demander à l'utilisateur d'appuyer sur une touche directionnelle
    //? la flêche de la touche idiquera la valeur de la nouvelle direction
    //? par défaut on se déplace vers la droite (parce qu'il faut bien choisir une valeur par défaut)
