
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
        const canvas = document.querySelector('canvas');
        //! pour le moment ces deux lignes ne fonctionnent pas il faut donner la valeur de la taille du canvas en dur sur le html
        //canvas.height = (grid.y_case_number * (grid.size + grid.border)) + grid.border;
        //canvas.width = (grid.x_case_number * (grid.size + grid.border)) + grid.border;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000080';
        for(let y = 0; y < grid.y_case_number ; y++) {
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
                if(!grid.is_all_positions_set) {
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

ce fichier contient l'objet grid qui nous permet de générer la grille de jeu, de définir le nombre de case horizontale et verticale,
et de stocker toutes les valeurs de chacune des positions de la grille dans un tableau.
il nous permet également de piloter la taille des cases des bordures.

!REMARQUE les tailles sont dynamiques si elles sont modifiées ici elles seront modifiées pour le reste du code sauf pour la taille de la balise canvas
! il faut donc modifier en conséquence la taille de cette balise directement dans index.html

*DESCRIPTION DES PROPRIETES: (6)
- x_case_number, définit le nombre de cases sur l'axe des x
- y_case_number, définit le nombre de cases sur l'axe des y
- size, définit la taille en pixels d'une case
- border, définit la taille en pixels des bordures des cases
- all_positions, est un tableau qui va recevoir toutes les positions de la grille sous forme d'objets {x: <valeur>, y: <valeur>}
- is_all_positions_set, un booléen qui nous permet de savoir si toutes les positions de la grille ont déjà été stockées dans all_positions
*DESCRIPTION DES METHODES: (1)
- draw(), pour dessiner la grille et stocker nos positions dans le tableau on utilise cette méthode:
    - récupération de la balise canvas
    - on donne un contexte 2d au canvas
    - on donne une couleur à nos cases
    - on va parcourir le nombre de colonnes à l'aide d'une boucle 
        - dans cette boucle on va créer une autre boucle qui va parcourir le nombre de lignes
            - pour chaque case on va la dessiner sur la grille à l'aide des valeurs de nos propriétés 
            (une explication détaillée est donnée dans la méhode à l'aide de commentaires)
            - si notre booléen est false on incrémente notre tableau des positions avec la position courante
    - une fois les boucles parcourues on va pouvoir passer notre booléen à true 
    et éviter lors d'un nouvel appel de cette méthode-là sur implémentation de valeur dans ce tableau
*/