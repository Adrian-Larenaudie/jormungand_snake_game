import { grid } from './utils/grid.js';
import { Snake } from './models/Snake.js';
import { apple } from './utils/apple.js';
import { scoring } from './utils/scoring.js';
import { song } from './utils/song.js';

export const game = {
    
    //* la propriété qui définit la fin de la partie
    over: false,
    //* la propriété qui va recevoir l'instance du serpent
    jormungand: null,
    //* la propriété qui va recevoir le setinterval
    interval: null,
    //* la boutton de lancement de partie
    button: document.querySelector('.launch_button'),
    //* la boite modal pour modifier son style
    modal: document.querySelector('.modal'),

    //* pour initier la partie
    init: () => {       
        //* on va afficher le meilleure score si il y en a un
        scoring.init();
        //* on dessine la grille de jeu
        grid.draw();
        //* on instancie notre serpent: petite référence à la mtythologie scandinave <3
        game.jormungand = new Snake;
        //* on dessine le serpent
        game.jormungand.draw();  
        //* la modal est par défaut à visible
        game.modal.style.visibility = 'visible';
        //* évènement clique pour lancer la partie 
        game.button.addEventListener('click', (event) => {
            game.modal.style.visibility = 'hidden';
            game.launch_game();
        });     
    },

    //* méthodep pour lancer la partie
    launch_game: () => {
        //* si game over on clear l'interval au cas ou c'est un rematch
        clearInterval(game.interval);
        //* on active les touches directionnelles ZQSD
        game.user_input();
        //* le serpent commence à se déplacer :)
        game.interval = setInterval(game.on_move, game.jormungand.mouvement_speed);
        //* on veut une pomme
        apple.get(0);       
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
                //? taile de la grille x le nombre de case + le total des bordures - taille de la grille + bordure
                if(game.jormungand.body_cordinates[0].x < (grid.size * grid.x_case_number + (grid.x_case_number * grid.border)) - (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].x += (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].x = grid.border; 
                }
                break;
            case 'left':
                if(game.jormungand.body_cordinates[0].x > (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].x -= (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].x = (grid.size * grid.x_case_number + (grid.x_case_number * grid.border)) - (grid.size); 
                }
                break;
            case 'top':
                if(game.jormungand.body_cordinates[0].y > (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].y -= (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].y = (grid.size * grid.y_case_number + (grid.y_case_number * grid.border)) - (grid.size);
                }
                break;
            case 'bottom':
                if(game.jormungand.body_cordinates[0].y < (grid.size * grid.y_case_number + (grid.y_case_number * grid.border)) - (grid.size + grid.border)) {
                    game.jormungand.body_cordinates[0].y += (grid.size + grid.border);
                } else {
                    game.jormungand.body_cordinates[0].y = grid.border;
                }
                break;
        };

        //* si la tête du serpent arrive sur la position de la pomme il doit la manger
        if(game.jormungand.body_cordinates[0].y === apple.position.y && game.jormungand.body_cordinates[0].x === apple.position.x) {
            //* la pomme prend une position null
            apple.position.x = null;
            apple.position.y = null;
            //* on jou un bruit de pomme croqué
            song.eaten_apple();
            //* on demande une nouvelle pomme
            apple.get(0);
            //* on fait grandire le serpent d'une case 
            //! même principe qu'en haut on doit faire une copie et casser le lien qu'il a avec son index parent
            game.jormungand.body_cordinates.push(JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]))[0]);
            //* on met à jour le score
            scoring.eaten_apples++;
            scoring.update_score(game.jormungand.body_cordinates);
        };

        //* on met à jour les positions de chaque parties du corps
        game.jormungand.update_cordinates(last_head_position);

        //* on va vérifier si le serpent se mort la queue (si la position de la tête est égal à la position d'une partie de son corps)
        game.check_if_bit_himself();

        //* le méthode du dessus change la valer de game.over à true
        if(game.over) {
           game.end_game();
        } else {
            //* sinon on redessine tout (grille, serpent et pomme)
            grid.draw();
            apple.draw();
            game.jormungand.draw();     
        }
              
    },

    //* les instructions lancé si la partie est perdue
    end_game: () => {
        //* si game over on clear l'interval
        clearInterval(game.interval);
        //* on met à jour le meilleure score dans le local storage
        scoring.set_best_score();
        //* on previens le joueur
        document.querySelector('.modal_title').textContent = 'Game Over!';
        //* on lui indique le score qu'il a fait
        document.querySelector('.end_game_score').textContent = 'score: ' + scoring.end_game_score;
        //* on remet la valeur de game.over à false
        game.over = false;
        //* et on relance tout
        game.init();
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