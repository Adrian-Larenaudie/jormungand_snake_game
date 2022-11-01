export const apple = {
    size: 40,
    color: "#dc143c",
    position: {x: null, y: null},
    x_case_number: 27,
    y_case_number: 17,
    border: 1,

    //* la méthode qui nous permet de récupérer une position aléatoire pour la pomme
    get_random_position: () => {
        //* on va d'abord devoir générer un tableau avec toute les positions de départ possible sur l'axe des x horizontal
        let x_positions = [];
        for (let index = 0; index < apple.x_case_number; index++) {
            x_positions.push(apple.border + index + (index * apple.size));      
        }
        console.log(x_positions);
        //* puis on va faire la même chose pour l'axe des y vertical
        let y_positions = [];
        for (let index = 0; index < apple.y_case_number; index++) {
            y_positions.push(apple.border + index + (index * apple.size));      
        }
        console.log(y_positions);
        //* ensuite on va piocher aléatoirement une valeur dans chacun des tableau
        apple.position.x = x_positions[Math.floor(Math.random()*x_positions.length)];
        apple.position.y = y_positions[Math.floor(Math.random()*y_positions.length)];
        console.log(apple.position);
        //* et mettre à jour les valeur de apple.position puis jouer apple.draw
        apple.draw();
    },

    //* méthode qui permet de dessiner la pomme
    draw: () => {
        //* on vérifie que la 1ere pomme a bien été créee
        if(apple.position.x != null && apple.position.y != null) {
            const canvas = document.querySelector('canvas');
            // on donne un context au canvas
            const ctx = canvas.getContext('2d');
            // on donne une couleur verte à notre partie du corps courante
            ctx.fillStyle = apple.color;
            // puis une position
            ctx.fillRect( apple.position.x, apple.position.y, apple.size, apple.size);
        }   
    },
};