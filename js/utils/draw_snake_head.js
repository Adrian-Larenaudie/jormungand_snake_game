export const draw_snake_head = () => {
    // pour faire simple on va juste déssiner un carré vert sur la grille
    const snake = {
        head: {
            size: 40,
            color: "#00561B",
            position: {
                // sur l'axe horizontale
                x: 1,
                // sur l'axe verticale
                y: 1,
            }
        },
    }
    // balise canvas
    const canvas = document.querySelector('canvas');
    // on donne un context au canvas, (le jeu sera en 2d)
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00561B';
    ctx.fillRect(snake.head.position.x, snake.head.position.y, snake.head.size, snake.head.size);
};