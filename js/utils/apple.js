import { jormungand } from "../jormungand.js";

export const apple = {
    size: 40,
    color: "#dc143c",
    position: {x: null, y: null},
    x_case_number: 27,
    y_case_number: 17,
    border: 1,

    get: (timer) => {
        setTimeout(() => {
            apple.get_random_position(); 
        }, timer);
    },

    //* la méthode qui nous permet de récupérer une position aléatoire pour la pomme
    get_random_position: () => {
        //* on va d'abord devoir générer un tableau avec toute les positions de départ possible sur l'axe des x horizontal
        let x_positions = [];
        for (let index = 0; index < apple.x_case_number; index++) {
            const position = apple.border + index + (index * apple.size)
            //* pour empêcher la pomme de poper sur le serpent on vérifie si la position courante est présente dans l'instance du serpent: jormungand
            jormungand.body_cordinates.forEach(body_position => {
                if(body_position.x !== position) {
                    x_positions.push(position);     
                }
            });   
        }
        //* puis on va faire la même chose pour l'axe des y vertical
        let y_positions = [];
        for (let index = 0; index < apple.y_case_number; index++) {
            const position = apple.border + index + (index * apple.size)
            //* pour empêcher la pomme de poper sur le serpent on vérifie si la position courante est présente dans l'instance du serpent: jormungand
            jormungand.body_cordinates.forEach(body_position => {
                if(body_position.y !== position) {
                    y_positions.push(position);     
                }
            });     
        }
        //* ensuite on va piocher aléatoirement une valeur dans chacun des tableau
        apple.position.x = x_positions[Math.floor(Math.random()*x_positions.length)];
        apple.position.y = y_positions[Math.floor(Math.random()*y_positions.length)];
        //* et mettre à jour les valeur de apple.position puis jouer apple.draw
        apple.draw();
    },

    //* méthode qui permet de dessiner la pomme
    draw: () => {
        const canvas = document.querySelector('canvas');
        // on donne un context au canvas
        const ctx = canvas.getContext('2d');
        // on donne une couleur verte à notre partie du corps courante
        ctx.fillStyle = apple.color;
        //* on vérifie que la 1ere pomme a bien été créee
        if(apple.position.x != null && apple.position.y != null) {
            ctx.fillRect( apple.position.x, apple.position.y, apple.size, apple.size);
        //* sinon on dessine une pomme invisible
        } else {
             ctx.fillRect( 0, 0, 0, 0);
        }   
    },
};