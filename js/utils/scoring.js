export const scoring = {
    /* ------------------ PROPRIETES ---------------- */
    current_score_displayer: document.querySelector('.current_score_value'),
    best_score_displayer: document.querySelector('.best_score_value'),
    eaten_apples_displayer: document.querySelector('.eaten_apples_value'),
    eaten_apples: 0,
    current_score: 0,
    end_game_score: 0,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        scoring.get_best_score();
    },

    get_best_score: () => {
        if(localStorage.getItem("best_score")) {
            scoring.best_score_displayer.textContent = localStorage.getItem("best_score");
        }
    },

    set_best_score: () => {
        if(localStorage.getItem("best_score")) {
            if(localStorage.getItem("best_score") < scoring.current_score) {
                localStorage.setItem("best_score", scoring.current_score);
            }
        } else {
            localStorage.setItem("best_score", scoring.current_score);
        }
        scoring.end_game_score = scoring.current_score;
        scoring.current_score = 0;
        scoring.eaten_apples = 0;
        scoring.current_score_displayer.textContent = 0;
        scoring.eaten_apples_displayer.textContent = 0;
    },

    update_score: (array_of_snake_body_part) => {
        scoring.current_score+= array_of_snake_body_part.length * scoring.eaten_apples;
        scoring.current_score_displayer.textContent = scoring.current_score;
        scoring.eaten_apples_displayer.textContent = scoring.eaten_apples;
    },
    /* ------------------- METHODES ----------------- */
};

/*
*DOCUMENTATION FR

ce fichier contient l'objet scoring qui va nous permettre de gérer toute la partie score de la partie
afficher le score courant le nombre de pommes mangées et stockés le meilleur score en local storage

*DESCRIPTION DES PROPRIETES: (6)
- current_score_displayer, reçoit la balise pour afficher le score courant
- best_score_displayer, reçoit la balise pour afficher le meilleur score
- eaten_apples_displayer, reçoit la balise pour afficher le nombre de pommes qui ont été mangées jusqu'à présent
- eaten_apples, reçoit le nombre de pommes qui ont été mangées jusqu'à présent
- current_score, reçoit la valeur du score courant
- end_game_score, reçoit la valeur du score une fois la partie terminer (pour l'afficher dans la modal de fin de partie)

*DESCRIPTION DES METHODES: (4)
- init(), à l'initialisation on va chercher le meilleur score
- get_best_score(), une simple condition va vérifier si il y a un best score dans le local storage et l'attribuer à la balise correspondante
- set_best_score(), ici on va mettre le meilleur score à jour
    - une condition vérifie si best score est présent dans le local storage
        - une seconde condition va vérifier si ce score est inférieur au score courant
            - si c'est le cas on met à jour la valeur du best score en l'écrasant avec le nouveau score
    - si il n'y a pas de best score dans le local storage
        - on le crée avec la valeur du score de la partie qui vient d'être terminée
    - on va réinitialiser toutes les valeurs de l'objet en les rapassant à 0
    - et afficher le score de fin de partie dans la modale
- update_score(), ici on va calculer le nombre de points marqués à chaque pomme mangée par le serpent et l'ajouter au score total 
*/