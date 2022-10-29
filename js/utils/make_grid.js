// Appeler cette fonction permet de créer une grille dans la balise <canvas> du fichier index.html lié
export const make_grid = () => {
    // nombre de case horizontale
    const x_boxes_numbers = 27;
    // nombre de case verticale
    const y_boxes_numbers = 17;
    // taille des cases en pixels (carrées)
    const boxe_size = 40;
    // balise canvas
    const canvas = document.querySelector('canvas');
    // bordure en pixels du canvas
    const canvas_border = 1;
    // on donne un context au canvas, (le jeu sera en 2d)
    const ctx = canvas.getContext('2d');
    // couleur de nos cases (bleue ocean #000080)
    ctx.fillStyle = '#000080';
    // une itération pour chaque lignes de la grille
    for(let y = 0; y < y_boxes_numbers ; y++) {
        // puis une itération pour afficher toutes les cases sur la ligne courante 
        for(let x = 0; x < x_boxes_numbers; x++) {
        // la méthode .fillRect() prend 4 paramètres:
            //? - le 1er: définit le début de la case sur l'axe horizontal
            //? - le 2eme: définit le début de la case sur l'axe vertical
            //? - le 3eme: définit la longueur de la case
            //? - le 4eme définit la hauteur de la case
        // explication des variables utilisées pour les paramètres de cette méthode
            //? - 1er param: la bordure du canvas + l'index x courant (créra un espace entre les cases) + la taille de la boxe * l'index x courant
            //? - 2eme param: idem, on va simplement remplacer les valeurs x par les valeurs y: ce paramètre change qd on a finit d'afficher une ligne
            //? - 3eme et 4eme param: la taille de la boxe, sachant qu'elle est carrée la valeur est la même pour ces deux paramètres
            ctx.fillRect(canvas_border + x + (x * boxe_size), canvas_border + y + (y * boxe_size), boxe_size, boxe_size);
        };
    };
};