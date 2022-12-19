import { game } from "./game.js";

export const index = {
    init: () => {
        index.manage_to_small_screen_message();
    },

    on_visibility_change_page_event_handler: () => {
        document.addEventListener("visibilitychange", (event) => {
            game.manage_pause(true);
        });
    },
    
    manage_pause: (from_on_visible_event) => {
        if(game.pause && game.running && !from_on_visible_event) {
            game.interval = setInterval(game.on_move, game.jormungand.mouvement_speed);
            game.pause_modal.style.visibility = "hidden";
            game.pause = false;
            game.jormungand.direction = game.last_direction;
        } else if(!game.pause && game.running) {
            game.pause_modal.style.visibility = "visible";
            clearInterval(game.interval);
            game.pause = true;
        }        
    },
    
    manage_to_small_screen_message: () => {
        if(window.innerWidth < 680) {
            document.querySelector('.core').style.display = "none";
            document.querySelector('.screen_not_supported').style.display = "block";

        } else {
            //* LET'S GOO!
            game.init();
            // event appelé une fois, détectera le changement de page pour activer une pause si le jeu est lancé
            index.on_visibility_change_page_event_handler();
            index.slider_display_panel();
        }
    },

    slider_display_panel: () => {
        document.querySelector('.img_bloc').addEventListener('mouseover', (event) => {
            document.querySelector('.side_how_to_play_panel').classList.add('slide_animation_panel');
        });
         
        document.querySelector('.img_bloc').addEventListener('mouseleave', (event) => {
            document.querySelector('.side_how_to_play_panel').classList.remove('slide_animation_panel');
        });
        
    },
};

index.init();

