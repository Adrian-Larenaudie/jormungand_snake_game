/* ------------------ IMPORTS ---------------- */
import { Snake } from './models/Snake.js';
import { grid } from './utils/grid.js';
import { apple } from './utils/apple.js';
import { scoring } from './utils/scoring.js';
import { song } from './utils/song.js';
/* ------------------ IMPORTS ---------------- */

export const game = {
    /* ------------------ PROPRIETES ---------------- */
    over: false,
    jormungand: null,
    interval: null,
    button: document.querySelector('.launch_button'),
    modal: document.querySelector('.modal'),
    pause_modal: document.querySelector('.modal_pause'),
    pause: false,
    last_direction: "right",
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {       
        song.init();
        scoring.init();
        grid.draw();
        game.jormungand = new Snake;
        game.jormungand.draw();  
        game.modal.style.visibility = 'visible'; 
        game.button.addEventListener('click', (event) => {
            game.modal.style.visibility = 'hidden';
            game.launch_game();
        });     
    },

    launch_game: () => {
        game.over = false;
        clearInterval(game.interval);
        game.user_input();
        game.interval = setInterval(game.on_move, game.jormungand.mouvement_speed);
        apple.get(0);       
    },

    user_input: () => {
        document.addEventListener('keypress', game.user_input_handler, true);
    },

    remove_user_input: () => {
        document.removeEventListener('keypress', game.user_input_handler, true);
    },

    user_input_handler: (event) => {
        if(!game.over) {
            switch (event.key) {
                case "z":
                    if(game.jormungand.direction != "bottom" && !game.pause) {
                        game.jormungand.direction = "top";
                        game.last_direction = "top";
                    }
                    break;
                case "q":
                    if(game.jormungand.direction != "right" && !game.pause) {
                        game.jormungand.direction =  "left";
                        game.last_direction = "left";
                    }
                    break;
                case "s":
                    if(game.jormungand.direction != "top" && !game.pause) {
                        game.jormungand.direction =  "bottom";
                        game.last_direction = "bottom";
                    }
                    break;
                case "d":
                    if(game.jormungand.direction != "left" && !game.pause) {
                        game.jormungand.direction =  "right";
                        game.last_direction = "right";
                    }
                    break;
                case " ":
                    if(game.pause) {
                        game.interval = setInterval(game.on_move, game.jormungand.mouvement_speed);
                        game.pause_modal.style.visibility = "hidden";
                        game.pause = false;
                        game.jormungand.direction = game.last_direction;
                    } else {
                        game.pause_modal.style.visibility = "visible";
                        clearInterval(game.interval);
                        game.pause = true;
                    }        
                break;
            };
        }     
    },

    on_move: () => {       
        const body_cordinates_copy = JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));
        const last_head_position = body_cordinates_copy[0];
        
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

        if(game.jormungand.body_cordinates[0].y === apple.position.y && game.jormungand.body_cordinates[0].x === apple.position.x) {
            apple.position.x = null;
            apple.position.y = null;
            song.eaten_apple();
            apple.get(100);
            game.jormungand.body_cordinates.push(JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]))[0]);
            scoring.eaten_apples++;
            scoring.update_score(game.jormungand.body_cordinates);
        };
        game.jormungand.update_cordinates(last_head_position);
        game.check_if_bit_himself();

        if(game.over) {
           game.end_game();
        } else {
            grid.draw();
            apple.draw();
            game.jormungand.draw();     
        }
              
    },

    check_if_bit_himself: () => {
        game.jormungand.body_cordinates.forEach((body_part, index) => {
            if(index != 0 && body_part.x === game.jormungand.body_cordinates[0].x && body_part.y === game.jormungand.body_cordinates[0].y) {
                game.over = true;
            }
        })
    },

    end_game: () => {
        game.remove_user_input();
        clearInterval(game.interval);
        scoring.set_best_score();
        document.querySelector('.modal_title').textContent = 'Game Over!';
        document.querySelector('.end_game_score').textContent = 'score: ' + scoring.end_game_score;
        game.init();
    },
    /* ------------------- METHODES ----------------- */
};

//* LET'S GOO!
game.init();

/*
*DOCUMENTATION FR

game.js est le fichier principale du jeu.

On retrouve une partie importation des différents objets contenus dans différents fichiers:
- Snake.js qui est une classe et qui va permettre d'instancier le serpent
- grid.js qui est le fichier permettant de générer une grille et de la dessiner dans la balise canvas
- apple.js qui va nous permettre de générer une pomme sur une position valide sur la grille de jeu (pas sur le serpent)
- socring.js qui nous permettre de gérer tout le système de score du jeu: nb de pomme mangée, nb de point marqué, meilleure score en locale storage
- song.js qui nous permet de jouer un son lors du croquage de pomme, d'activer désactiver ce son à l'aide d'un bouton sur le document

Ensuite nous avons la partie qui contient notre objet game dans lequel on retrouve plusieurs propriétés et méthodes.

Les propriétés vont nous permettre de déterminer un état et les méthodes de modifier cet état.

*DESCRIPTION DES PROPRIETES: (8)

- over, booléen qui détermine si la partie est terminée ou non
- jormungand, qui va recevoir l'instance du serpent
- interval, qui va recevoir le setInterval du jeu (permet de gérer l'avancement du serpent tout les x temps en millisecondes)
- button, reçoit l'élément du DOM qui permet de lancé la partie lors du clique sur ce dernier
- modal, reçoit l'élément du DOM qui contient la boite modale affiché en début et fin de partie
- pause_modal, reçoit l'élément du DOM qui contient la boite modale affichée lors d'une pause
- pause, booléen qui définit si la pause est activée ou non
- last_direction, permet de stocker la valeur de la dernière direction du serpent

*DESCRIPTION DES METHODES: (8)

- init(), permet d'initialiser une partie, on va y appeler plusieurs méthodes et effectuer différentes actions:
    - initialisation du son
    - initialisation du score
    - instanciation du serpent 
    - dessin de la grille de jeu 
    - dessin du serpent 
    - ajout de l'évènement clique sur le bouton de lancement de partie: au clique la modal disparait et on joue la méthode launch_game();

- launch_game(), permet de lancer la partie, détailles des instructions:
    - over prend la valeur false (par défaut à false dans le cas d'un rematch il est à true)
    - on clear l'interval pour éviter de ce retrouver avec plusieurs interval actifs (là aussi c'est pour le cas du rematch)
    - on active les inputs utilisateur avec la méthode user_input() il s'agit de l'évènement keypress
    - on stock l'interval dans la propriété interval, 1er param = la méthode on_move(), 2eme param = la vitesse du serpent
    - on demande à notre objet apple de nous générer une pomme

- user_input(), permet d'activer les inputs de l'utilisateur à l'aide de l'évènement keypress et du hanlder user_input_handler()

- remove_user_input(), permet de désactiver les inputs de l'utilisateur en prenant en param le handler user_input_handler()

- user_input_handler(), est le handler sur les inputs utilisateurs:
    - permet de modifier la direction serpent
    - une condition s'assure que le jeu n'est pas en pause pour ne pas enregistrer une direction de cette état
    - un switch permet de faire quelque chose en fonction de la touche appuyée par l'utilisateur
    - dans le cas Z Q S ou D on modifie la direction du serpent et on l'enregistre dans last_direction, sauf si le serpent risque de faire demi tour
    - dans le cas de " ":
        - si le jeu est en pause:
            - dans la propriété interval on remet le setInterval avec la méthode on_move() en 1er param, et la vitesse du snake en 2eme param
            - on cache la modal de pause
            - on passe la propriété pause à false
        - si le jeu n'est pas en pause
            - on affiche la modal de pause
            - on clear l'interval
            - on passe la propriété pause à true

- on_move(), la méthode la plus complexe du projet:
    - on va créer une copie profonde du tableau contenant les coordonnées du serpent
    - on stock dans une constante la position de la tête du serpent
    - un switch qui permet de vérifier dans quelle direction on se trouve
        - en fonction de la direction on permet à la tête du serpent de se déplacer d'une case vers l'avant
        - si on arrive en bout de grille le serpent se téléporte sur le coté opposé de la grille 
    - une condition permet de vérifier si la tête du serpent est sur la même position que la pomme générée
        - si c'est le cas le serpent grandit d'une case
        - la position de la pomme est passée à null
        - les positions d'une nouvelle pomme sont générées
        - on joue le son 
        - on met à jour le score
    - ensuite on met à jour les positions du serpent derrière la tête à l'aide de la méthode update_cordinates()
    - puis on vérifie si le serpent se mord la queue à l'aide de la méthode check_if_bit_himself() cette méthode va modifier l'état over 
    - une condition va vérifier si l'état over est true ou false
        - si c'est true on va jouer la méthode end_game() qui mettra fin à la partie
        - si c'est false:
            - on redessine la grille
            - on redessine la pomme à l'aide des positions générées auparavant
            - puis le serpent est redessiné également

- check_if_bit_himself(), permet de vérifier si la tête du serpent se trouve sur l'une des position du corps du serpent
    - pour cela on parcourt le tableau des position du corps du serpent 
    - une condition vérifie si la position de la partie du corps parcourue est strictement égal à la position de la tête saud si il s'agot de la tête
        - si c'est le cas on passe la propriété over à true
        - sinon on ne fait rien

- end_game(), permet de mettre fin à la partie lorsque cette méthode est jouée:
    - on commence par retirer les évènement keypress
    - on clear l'interval on_move()
    - on joue la méthode qui met à jour le meilleure score si il y en a un
    - on modifie le titre de la modale par Game Over!
    - on affiche le score de la partie terminé dans une balise <p> contenue dans la modale
    - on rejout la méthode game.init() pour préparer la prochaine partie

*REMARQUES:
1. on peut retrouver ce genre d'écriture ligne 95 par exemple:
const body_cordinates_copy = JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));
lors du développement, j'ai du faire face à un fonctionnemant de JavaScript que je ne connaissais pas.
mon objectif était, de stocker la valeur de l'index 0 du tableau body_cordinates à un instant T et d'exploiter cette valeur plus tard dans le code.
je souhaitais faire cela puisque le tableau est voué à changer tout au long de du déroulement du code, 
il fallait donc que j'effectue une sorte de sauvegarde de la donnée qui m'interesse.

le comportement que j'ai remarqué est le suivant: JavaScript va lié les deux tableaux. 
si je modifie la valeur de l'index 0 du 1er tableau la valeur de l'index 0 du second sera modifiée également.
dans ce cas l'intéret de sauvegarder ma valeur à un instant T ne sert donc à rien puisqu'elle changera dans tous les cas.

j'ai cependant trouvé une solution qui permet de "casser le lien" entre le 1er tableau et le second tableau, 
il est possible à l'aide de différentes méthodes natives de faire ce qu'on appelle une copie profonde d'une variable:
[...] le spread operator
JSON.stringify() la méthode stringify
.slice() et la méthode slice
j'applique donc ces trois méthodes sur mon tableau avant d'en effectuer une copie afin de m'assurer qu'ils ne soient plus liés entre eux.

*/