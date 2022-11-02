//* Appeler cette fonction permet de créer une grille dans la balise <canvas> du fichier index.html lié
export const grid = {
    //* nombre de case horizontale
    x_case_number: 20,
    //* nombre de case verticale
    y_case_number: 15,
    //* taille des cases en pixels (carrées)
    size: 30,
    //* bordure en pixels du canvas
    border: 1,

    //* cette méthoden nous permet de dessiner la grille
    draw: () => {
        //* balise canvas
        const canvas = document.querySelector('canvas');
        //! pour le moment ces deux lignes ne fonctionnent pas il faut donner la valeur de la taille du canvas en dur sur le html
        //canvas.height = (grid.y_case_number * (grid.size + grid.border)) + grid.border;
        //canvas.width = (grid.x_case_number * (grid.size + grid.border)) + grid.border;
        //* on donne un context au canvas, (le jeu sera en 2d)
        const ctx = canvas.getContext('2d');
        //* couleur de nos cases (bleue ocean #000080)
        ctx.fillStyle = '#000080';
        //* une itération pour chaque lignes de la grille
        for(let y = 0; y < grid.y_case_number ; y++) {
            //* puis une itération pour afficher toutes les cases sur la ligne courante 
            for(let x = 0; x < grid.x_case_number; x++) {
            //* la méthode .fillRect() prend 4 paramètres:
                //? - le 1er: définit le début de la case sur l'axe horizontal
                //? - le 2eme: définit le début de la case sur l'axe vertical
                //? - le 3eme: définit la longueur de la case
                //? - le 4eme définit la hauteur de la case
            //* explication des variables utilisées pour les paramètres de cette méthode
                //? - 1er param: la bordure du canvas + l'index x courant (créra un espace entre les cases) + la taille de la boxe * l'index x courant
                //? - 2eme param: idem, on va simplement remplacer les valeurs x par les valeurs y: ce paramètre change qd on a finit d'afficher une ligne
                //? - 3eme et 4eme param: la taille de la boxe, sachant qu'elle est carrée la valeur est la même pour ces deux paramètres
                ctx.fillRect(grid.border + x + (x * grid.size), grid.border + y + (y * grid.size), grid.size, grid.size);
            };
        };
    }
};