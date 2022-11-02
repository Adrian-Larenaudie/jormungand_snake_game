import { grid } from './utils/grid.js';
import { Snake } from './models/Snake.js';
import { apple } from './utils/apple.js';

export const game = {
    
    //* la propriété qui définit la fin de la partie
    over: false,
    //* la propriété qui va recevoir l'instance du serpent
    jormungand: null,
    //* la propriété qui va recevoir le setinterval
    interval: null,

    //* pour initier la partie
    init: () => {
        //* pour le moment un msg alert pour indiquer que la partie va débuter
        alert("Commencer la partie")
        //* on instancie notre serpent: petite référence à la mtythologie scandinave <3
        game.jormungand = new Snake;
        //* on dessine la grille de jeu
        grid.draw();  
        //* on dessine le serpent
        game.jormungand.draw();  
        //* on active les touches directionnelles ZQSD
        game.user_input();
        //* le serpent commence à se déplacer :)
        game.interval = setInterval(game.on_move, game.jormungand.mouvement_speed);
        //* on veut une pomme au bout de 1000 milliseconde
        apple.get(1000);       
    },

    //* méthode pour gérer les évènements sur les touche ZQSD et modifier la valeur de la direction du serpent
    user_input: () => {
        document.addEventListener('keypress', (event) => {
            switch (event.key) {
                case "z":
                    //? empêcher de faire demi tour avec cette condition
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
   
    //* méthode qui permet de gérer le mouvement du serpent
    on_move: () => {       
        //! ici pour éviter que la variable soit liée aux changement de l'index du tableau:
        //! on lui accole une succession de méthode pour le détacher de ce lien
        const body_cordinates_copy = JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));
        const last_head_position = body_cordinates_copy[0];
        
        //* le switch permet de modifier la position de la tête selon la valeur de la direction
        //* on a ensuite des if() qui permettent de gérer l'arriver du snake en bout de grille et le faire réaparaitre de l'autre côté
        switch (game.jormungand.direction) {
            case 'right':
                if(game.jormungand.body_cordinates[0].x < (grid.size * grid.x_case_number + grid.x_case_number) - (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].x += (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].x = grid.border; 
                }
                break;
            case 'left':
                if(game.jormungand.body_cordinates[0].x > (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].x -= (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].x = (grid.size * grid.x_case_number + grid.x_case_number) + grid.border; 
                }
                break;
            case 'top':
                if(game.jormungand.body_cordinates[0].y > (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].y -= (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].y = (grid.size * grid.y_case_number + grid.y_case_number) + grid.border;
                }
                break;
            case 'bottom':
                if(game.jormungand.body_cordinates[0].y < (grid.size * grid.y_case_number + grid.y_case_number) - (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].y += (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].y = grid.border;
                }
                break;
        };

        //* si la tête du serpent arrive sur la position de la pomme il doit la manger
        if(game.jormungand.body_cordinates[0].y === apple.position.y && game.jormungand.body_cordinates[0].x === apple.position.x) {
            //* la pomme rprend une position null
            apple.position.x = null;
            apple.position.y = null;
            //* on demande une nouvelle pomme qui arrivera dans 500 milliseconde
            apple.get(500);
            //* on fait grandire le serpent d'une case 
            //! même principe qu'en haut on doit faire une copie et casser le lien qu'il a avec son index parent
            game.jormungand.body_cordinates.push(JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]))[0]);
        };

        //* on met à jour les positions de chaque parties du corps
        game.jormungand.update_cordinates(last_head_position);

        //* on va vérifier si le serpent se mort la queue (si la position de la tête est égal à la position d'une partie de son corps)
        game.check_if_bit_himself();

        //* le méthode du dessus change la valer de game.over à true
        if(game.over) {
            //* si game over on clear l'interval
            clearInterval(game.interval);
            //* on previens le joueur
            alert('Game Over!');
            //* on remet la valeur de game.over à false
            game.over = false;
            //* et on relance tout
            game.init();
        } else {
            //* sinon on redessine tout (grille, serpent et pomme)
            grid.draw();
            apple.draw();
            game.jormungand.draw();     
        }
              
    },

    //* méthode qui vérifie si le serpent se mort la queue
    check_if_bit_himself: () => {
        //* ici on parcourt les parties du serpent
        game.jormungand.body_cordinates.forEach((body_part, index) => {
            //* si la partie courante n'est pas la tête et que sa position est strctement égal à la position de la tête la partie est perdu
            if(index != 0 && body_part.x === game.jormungand.body_cordinates[0].x && body_part.y === game.jormungand.body_cordinates[0].y) {
                game.over = true;
            }
        })
    }
};

//* LET'S GOO!
game.init();