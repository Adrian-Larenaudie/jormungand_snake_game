export const song = {
    /* ------------------ PROPRIETES ---------------- */
    on_off: 1,
    on_svg: document.querySelector('.song_on'),
    off_svg: document.querySelector('.song_off'),
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        song.handle_off_svg();
        song.handle_on_svg();
    },

    eaten_apple: () => {
        const audio = new Audio();
        audio.src = "../../song/eaten_apple_song.mp3";
        if(song.on_off === 1) {
            audio.play();
        }
    },

    handle_on_svg: () => {
        song.on_svg.addEventListener('click', (event) => {
            song.on_svg.style.display = 'none';
            song.off_svg.style.display = 'block';
            song.on_off = 0;
        })
    },

    handle_off_svg: () => {
        song.off_svg.addEventListener('click', (event) => {
            song.off_svg.style.display = 'none';
            song.on_svg.style.display = 'block';
            song.on_off = 1;
        })
    },
    /* ------------------- METHODES ----------------- */

};

/*
*DOCUMENTATION FR

ce fichier contient un objet song qui nous permet de jouer un son lorsqu'une pomme est mangée par le serpent 
il nous permet également de gérer l'activation/désactivation du son par l'utilisateur à l'aide d'un bouton 

*DESCRIPTION DES PROPRIETES: (3)
- on_off, défini à l'aide d'une valeur binaire si le son est "on" ou "off" 1 = "on" 0 = "off"
- on_svg, contient la balise affichée lorsque le son est "on" fait office de bouton pour changer l'état à "off"
- off_svg, contient la balise affichée lorsque le son est "off" fait office de bouton pour changer l'état à "on"

*DESCRIPTION DES METHODES: (4)
- init(), ajoute les handler qui écoute le clique sur les balises image "on" et "off"
- eaten_apple(), la méthode est jouée lorsqu'une pomme est mangée
    - on crée un nouvel audio à l'aide de la classe Audio native à js
    - on ajoute une source à notre audio (ici un fichier mp3 qui contient le son que l'on veut jouer)
    - si le son est activé
        - on applique la méthode play() à notre son ce qui permet de la jouer
        - sinon on ne fait rien
- handle_on_svg(), 
    - ajoute l'évènement clique sur la balise on_svg
    - cache la balise on_svg
    - affiche la balise off_svg 
    - passe la propriété on_off à 0 (plus de son)

- handle_off_svg(), fonctionne comme handle_on_svg sauf que tout est inversé
*/