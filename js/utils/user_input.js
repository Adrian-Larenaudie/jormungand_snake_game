// import de snake pour pouvoir modifier sa direction
import { snake } from './snake.js';

// la fonction user_input nous permet de détecter l'évènement keypress et modifier la valeur de la direction du serpent
export const user_input = () => {
    document.addEventListener('keypress', (event) => {
        switch (event.key) {
            case "z":
                snake.head.direction = "top";
                break;
            case "q":
                snake.head.direction = "left";
                break;
            case "s":
                snake.head.direction = "bottom";
                break;
            case "d":
                snake.head.direction = "right";
                break;
        };     
    });
};