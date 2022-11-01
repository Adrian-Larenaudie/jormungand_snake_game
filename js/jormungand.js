import { draw_grid } from './utils/draw_grid.js';
import { Snake } from './models/Snake.js';
import { apple } from './utils/apple.js';

export const game = {
    
    //* la propriété qui définit la fin de la partie
    over: false,
    //* la propriété qui va accueillir notre serpent
    jormungand: null,
    interval: null,

    //* pour initier la partie
    init: () => {
        alert("Commencer la partie")
        //* tous d'abord on instancie notre serpent
        //* petite référence à la mtythologie scandinave <3
        game.jormungand = new Snake;
        // on dessine la grille
        draw_grid();  
        // on dessine le serpent
        game.jormungand.draw();  
        // on active les touches directionnelles ZQSD
        game.user_input();
        // le serpent commence à se déplacer :)
        game.interval = setInterval(game.on_move, game.jormungand.mouvement_speed);
        // on veut une pomme
        apple.get(1000);       
    },

    //* méthode pour gérer les évènements sur les touche ZQSD et modifier la valeur de la direction du serpent
    user_input: () => {
        document.addEventListener('keypress', (event) => {
            switch (event.key) {
                case "z":
                    if(game.jormungand.direction != "bottom") {
                        game.jormungand.direction = "top";
                    }
                    break;
                case "q":
                    if(game.jormungand.direction != "right") {
                        game.jormungand.direction =  "left";
                    }
                    break;
                case "s":
                    if(game.jormungand.direction != "top") {
                        game.jormungand.direction =  "bottom";
                    }
                    break;
                case "d":
                    if(game.jormungand.direction != "left") {
                        game.jormungand.direction =  "right";
                    }
                    break;
            };     
        });
    },
   
    //* méthode qui itère selon un interval régulier pour faire avancer le serpent
    on_move: () => {       
        //! js c'est parfois bizarre ici pour évitéer que la variable soit liée aux changement de l'index du tableau:
        //! une succession de méthode pour le détacher de ce lien
        const array = JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));
        const last_head_position = array[0];
        
        //* le switch permet de modifier la position de la tête selon la valeur de la direction
        //* on a ensuite des if() qui permettent de gérer l'arriver du snake en bout de grille et le faire réaparaitre de l'autre côté
        switch (game.jormungand.direction) {
            case 'right':
                if(game.jormungand.body_cordinates[0].x < 1107 - 41) {
                    game.jormungand.body_cordinates[0].x += 41;
                } else {
                    game.jormungand.body_cordinates[0].x = 1; 
                }
                break;
            case 'left':
                if(game.jormungand.body_cordinates[0].x > 41) {
                    game.jormungand.body_cordinates[0].x -= 41;
                } else {
                    game.jormungand.body_cordinates[0].x = 1108; 
                }
                break;
            case 'top':
                if(game.jormungand.body_cordinates[0].y > 41) {
                    game.jormungand.body_cordinates[0].y -= 41;
                } else {
                    game.jormungand.body_cordinates[0].y = 698;
                }
                break;
            case 'bottom':
                if(game.jormungand.body_cordinates[0].y < 697 - 41) {
                    game.jormungand.body_cordinates[0].y += 41;
                } else {
                    game.jormungand.body_cordinates[0].y = 1;
                }
                break;
        };

        //* si la tête du serpent arrive sur la position de la pomme 
        if(game.jormungand.body_cordinates[0].y === apple.position.y && game.jormungand.body_cordinates[0].x === apple.position.x) {
            apple.position.x = null;
            apple.position.y = null;
            apple.get(500);
            game.jormungand.body_cordinates.push(JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]))[0]);
        };

        //* on met à jour les positions de chaque parties du corps
        game.jormungand.update_cordinates(last_head_position);
        game.check_if_bit_himself()
        if(game.over) {
            clearInterval(game.interval);
            alert('Game Over!');
            game.over = false;
            game.init();
        } else {
            //* on redessine tout (grille, serpent et pomme)
            draw_grid();
            apple.draw();
            game.jormungand.draw();     
        }
              
    },

    //* méthode qui vérifie si le serpent se mort la queue
    check_if_bit_himself: () => {
        game.jormungand.body_cordinates.forEach((body_part, index) => {
            if(index != 0 && body_part.x === game.jormungand.body_cordinates[0].x && body_part.y === game.jormungand.body_cordinates[0].y) {
                game.over = true;
            }
        })
    }
};

//* LET'S GOO!
game.init();