
export const grid = {
    /* ------------------ PROPRIETES ---------------- */
    x_case_number: 20,
    y_case_number: 15,
    size: 30,
    border: 1,
    all_positions: [],
    is_all_positions_set: false,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
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
                //* si on a pas déjà rempli notre tableau on va pouvoir ajouter la position courante dans le tableau des positions
                if(!grid.is_all_positions_set) {
                    //* on stocke la position courante dans un tableau
                    grid.all_positions.push({x:  grid.border + x + (x * grid.size), y: grid.border + y + (y * grid.size)})
                }
            };
        };
        grid.is_all_positions_set = true;
    },
    /* ------------------- METHODES ----------------- */
};

/*
*DOCUMENTATION FR
*DESCRIPTION DES PROPRIETES: (6)
-
-
-
-
-
-
*DESCRIPTION DES METHODES: (1)
-
*/