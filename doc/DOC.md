# DOCUMENTATION

## I game.js est le fichier principale du jeu.

On retrouve une partie importation des différents objets contenus dans différents fichiers:
- Snake.js qui est une classe et qui va permettre d'instancier le serpent
- grid.js qui est le fichier permettant de générer une grille et de la dessiner dans la balise canvas
- apple.js qui va nous permettre de générer une pomme sur une position valide sur la grille de jeu (pas sur le serpent)
- socring.js qui nous permettre de gérer tout le système de score du jeu: nb de pomme mangée, nb de point marqué, meilleure score en locale storage
- song.js qui nous permet de jouer un son lors du croquage de pomme, d'activer désactiver ce son à l'aide d'un bouton sur le document

Ensuite nous avons la partie qui contient notre objet game dans lequel on retrouve plusieurs propriétés et méthodes.

Les propriétés vont nous permettre de déterminer un état et les méthodes de modifier cet état.

**DESCRIPTION DES PROPRIETES: (8)**

- over, booléen qui détermine si la partie est terminée ou non
- jormungand, qui va recevoir l'instance du serpent
- interval, qui va recevoir le setInterval du jeu (permet de gérer l'avancement du serpent tout les x temps en millisecondes)
- button, reçoit l'élément du DOM qui permet de lancé la partie lors du clique sur ce dernier
- modal, reçoit l'élément du DOM qui contient la boite modale affiché en début et fin de partie
- pause_modal, reçoit l'élément du DOM qui contient la boite modale affichée lors d'une pause
- pause, booléen qui définit si la pause est activée ou non
- last_direction, permet de stocker la valeur de la dernière direction du serpent

**DESCRIPTION DES METHODES: (8)**

- **init()**, permet d'initialiser une partie, on va y appeler plusieurs méthodes et effectuer différentes actions:
    - initialisation du son
    - initialisation du score
    - instanciation du serpent 
    - dessin de la grille de jeu 
    - dessin du serpent 
    - ajout de l'évènement clique sur le bouton de lancement de partie: au clique la modal disparait et on joue la méthode launch_game();

- **launch_game()**, permet de lancer la partie, détailles des instructions:
    - over prend la valeur false (par défaut à false dans le cas d'un rematch il est à true)
    - on clear l'interval pour éviter de ce retrouver avec plusieurs interval actifs (là aussi c'est pour le cas du rematch)
    - on active les inputs utilisateur avec la méthode user_input() il s'agit de l'évènement keypress
    - on stock l'interval dans la propriété interval, 1er param = la méthode on_move(), 2eme param = la vitesse du serpent
    - on demande à notre objet apple de nous générer une pomme

- **user_input()**, permet d'activer les inputs de l'utilisateur à l'aide de l'évènement keypress et du hanlder user_input_handler()

- **remove_user_input()**, permet de désactiver les inputs de l'utilisateur en prenant en param le handler user_input_handler()

- **user_input_handler()**, est le handler sur les inputs utilisateurs:
    - permet de modifier la direction serpent
    - une condition s'assure que le jeu n'est pas en pause pour ne pas enregistrer une direction de cette état
    - un switch permet de faire quelque chose en fonction de la touche appuyée par l'utilisateur
    - dans le cas Z Q S ou D on modifie la direction du serpent et on l'enregistre dans last_direction, sauf si le serpent risque de faire demi tour
    - dans le cas de " ":
        - si le jeu est en pause:
            - dans la propriété interval on remet le setInterval avec la méthode on_move() en 1er param, et la vitesse du snake en 2eme param
            - on cache la modal de pause
            - on passe la propriété pause à false
        - si le jeu n'est pas en pause
            - on affiche la modal de pause
            - on clear l'interval
            - on passe la propriété pause à true

- **on_move()**, la méthode la plus complexe du projet:
    - on va créer une copie profonde du tableau contenant les coordonnées du serpent
    - on stock dans une constante la position de la tête du serpent
    - un switch qui permet de vérifier dans quelle direction on se trouve
        - en fonction de la direction on permet à la tête du serpent de se déplacer d'une case vers l'avant
        - si on arrive en bout de grille le serpent se téléporte sur le coté opposé de la grille 
    - une condition permet de vérifier si la tête du serpent est sur la même position que la pomme générée
        - si c'est le cas le serpent grandit d'une case
        - la position de la pomme est passée à null
        - les positions d'une nouvelle pomme sont générées
        - on joue le son 
        - on met à jour le score
    - ensuite on met à jour les positions du serpent derrière la tête à l'aide de la méthode update_cordinates()
    - puis on vérifie si le serpent se mord la queue à l'aide de la méthode check_if_bit_himself() cette méthode va modifier l'état over 
    - une condition va vérifier si l'état over est true ou false
        - si c'est true on va jouer la méthode end_game() qui mettra fin à la partie
        - si c'est false:
            - on redessine la grille
            - on redessine la pomme à l'aide des positions générées auparavant
            - puis le serpent est redessiné également

- **check_if_bit_himself()**, permet de vérifier si la tête du serpent se trouve sur l'une des position du corps du serpent
    - pour cela on parcourt le tableau des position du corps du serpent 
    - une condition vérifie si la position de la partie du corps parcourue est strictement égal à la position de la tête saud si il s'agot de la tête
        - si c'est le cas on passe la propriété over à true
        - sinon on ne fait rien

- **end_game()**, permet de mettre fin à la partie lorsque cette méthode est jouée:
    - on commence par retirer les évènement keypress
    - on clear l'interval on_move()
    - on joue la méthode qui met à jour le meilleure score si il y en a un
    - on modifie le titre de la modale par Game Over!
    - on affiche le score de la partie terminé dans une balise <p> contenue dans la modale
    - on rejout la méthode game.init() pour préparer la prochaine partie

**REMARQUES:**  
On peut retrouver ce genre d'écriture ligne 95:  
`const body_cordinates_copy = JSON.parse(JSON.stringify([...game.jormungand.body_cordinates.slice()]));`  
lors du développement, j'ai du faire face à un fonctionnemant de JavaScript que je ne connaissais pas.  
mon objectif était, de stocker la valeur de l'index 0 du tableau body_cordinates à un instant T et d'exploiter cette valeur plus tard dans le code.  
je souhaitais faire cela puisque le tableau est voué à changer tout au long de du déroulement du code,   
il fallait donc que j'effectue une sorte de sauvegarde de la donnée qui m'interesse.  

le comportement que j'ai remarqué est le suivant: JavaScript va lié les deux tableaux.   
si je modifie la valeur de l'index 0 du 1er tableau la valeur de l'index 0 du second sera modifiée également.  
dans ce cas l'intéret de sauvegarder ma valeur à un instant T ne sert donc à rien puisqu'elle changera dans tous les cas.  

j'ai cependant trouvé une solution qui permet de "casser le lien" entre le 1er tableau et le second tableau,   
il est possible à l'aide de différentes méthodes natives de faire ce qu'on appelle une copie profonde d'une variable:  
[...] le spread operator  
JSON.stringify() la méthode stringify  
.slice() et la méthode slice  
j'applique donc ces trois méthodes sur mon tableau avant d'en effectuer une copie afin de m'assurer qu'ils ne soient plus liés entre eux.  

## II Snake.js

Il s'agit du fichier qui contient la classe du serpent avec ses propriétés et ses méthodes  
les propriétés permettent de définir un état et les méthodes de modifier cet état  

**DESCRIPTION DES PROPRIETES: (5)**

- body_cordinates, un tableau qui contient les coordonnées du serpent prend une position sur la grille par defaut puis
- colors, un petit objet qui contient les couleurs du serpent
- body_size, prend la taille d'une case de la grille
- direction, prend une valeur définissant la direction du serpent par défaut vers la droite "right"
- mouvement_speed, prend une valeur numérique qui définit la vitesse du serpent en milliseconde

**DESCRIPTION DES METHODES: (2)**

- **draw()**, permet de dessiner le serpent:
    - on va parcourir toutes les coordonnées du serpent et pour chaque coordonnées on va:
        - séléctionner la balise canvas
        - lui deonner un contexte 2d
        - à l'aide d'une ternaire si on se trouve à la position de la tête:
            - dessiner la tête avec la bonne couleur
            - sinon dessiner la partie du corps avec la bonne couleur

- **update_cordinates()**, permet de mettre à jour les coordonnées du serpent et prend un paramètre qui est la position de la tête avant son déplacement:
    - on va bouvler sur les coordonnées du corps mais en partant de la fin du tableau
        - si la partie du corps parcourut est celle suivant la tête
            - elle prend la position de la tête passée en paramètre (donc avant que la tête ne se déplace)
        - sinon si la partie parcourut n'est pas la tête 
            - elle prend la valeur de la position qui se trouve devant elle ici index - 1 puisque l'on parcourt le tableau à l'envers
            (cad de la fin vers le début)

## III apple.js

apple.js est le fichier qui contient l'objet apple et qui nous permet de gérer l'apparition des pommes sur la grille de jeu  
en prenant soin qu'elles n'apparaissent pas sur le serpent en mouvement.  
nous avons deux imports: game et grid puisque nous allons utiliser ces deux objets pour interagir avec leur état et le nôtre  

**DESCRIPTION DES PROPRIETES: (6)**

- size, reçoit la valeur numérique qui correspond à la taille d'une case de la grille
- color, reçoit une chaine de caractère qui contient une couleur hexadécimale pour colorer la pomme
- position, reçoit un objet avec deux valeurs x et y qui seront les positions de la pomme à générer
- x_case_number, reçoit la valeur numérique du nombre total de cases sur l'axe des x
- y_case_number, reçoit la valeur numérique du nombre total de cases sur l'axe des y
- border, reçoit la valeur numérique qui correspond à la taille de la bordure d'une case
- 
**DESCRIPTION DES METHODES: (3)**

- **get()**, nous permet d'appeler la méthode get_random_position() au bout d'un certain temps
- **get_random_position()**, permet à partir de deux tableaux: (un qui contient toutes les positions de la grille, 
un second qui contient toutes les positions du serpent) de trier le 1er en retirant les positions qui correspondent à celle du serpent:
    - on commence par faire une copie profonde de chacun des tableaux
    - on parcourt le tableau des coordonnées du serpent
        - dans lequel on va parcourir le tableau des positions de la grille
            - une condition va vérifier si la position de la grille courante est égal à celle de la position courante du corps du serpent
                - si c'est le cas on va retirer la position courante de la grille à l'aide la méthode splice(): 
                elle prend deux paramètre, 1er la valeur de l'index du tableau à retirer, 2eme le nombre d'éléments à retirer
    - une fois qu'on a fini de parcourir les tableaux on se retrouve avec un tableau des postions de la grille dans lequel 
    toutes les positions du serpent sont retirées
    - on va donc piocher la valeur d'un index aléatoirement dans ce tableau à l'aide de Math.random
    - on attribue la valeur x et la valeur y de cet index aux propriétés correspondantes
    - enfin on appelle la méthode draw()
- **draw()**, nous permet de dessiner la pomme
    - on stocke la balise cnavs dans une variable constante
    - on lui attribue un contexte 2d
    - on lui donne une couleur à l'aide de notre propriété color
    - si les positions de notre objet ne sont pas nulles on lui donne les bonnes coordonnées

**REMARQUE**  
pour éviter un clipping au niveau de la génération d'une pomme, on vérifie si les valeurs de la pomme ne sont pas nulles:  
dans le fichier game.js ces valeurs nulles sont attribuées dans le cas suivant: une pomme est mangée par le serpent. 

## IV grid.js

ce fichier contient l'objet grid qui nous permet de générer la grille de jeu, de définir le nombre de case horizontale et verticale,
et de stocker toutes les valeurs de chacune des positions de la grille dans un tableau.
il nous permet également de piloter la taille des cases des bordures.

**REMARQUE**   
Les tailles sont dynamiques si elles sont modifiées ici elles seront modifiées pour le reste du code sauf pour la taille de la balise canvas  
il faut donc modifier en conséquence la taille de cette balise directement dans index.html  

**DESCRIPTION DES PROPRIETES: (6)**

- x_case_number, définit le nombre de cases sur l'axe des x
- y_case_number, définit le nombre de cases sur l'axe des y
- size, définit la taille en pixels d'une case
- border, définit la taille en pixels des bordures des cases
- all_positions, est un tableau qui va recevoir toutes les positions de la grille sous forme d'objets {x: <valeur>, y: <valeur>}
- is_all_positions_set, un booléen qui nous permet de savoir si toutes les positions de la grille ont déjà été stockées dans all_positions

**DESCRIPTION DES METHODES: (1)**

- **draw()**, pour dessiner la grille et stocker nos positions dans le tableau on utilise cette méthode:
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

## V scoring.js

Ce fichier contient l'objet scoring qui va nous permettre de gérer toute la partie score de la partie  
afficher le score courant le nombre de pommes mangées et stockés le meilleur score en local storage  

**DESCRIPTION DES PROPRIETES: (6)**

- current_score_displayer, reçoit la balise pour afficher le score courant
- best_score_displayer, reçoit la balise pour afficher le meilleur score
- eaten_apples_displayer, reçoit la balise pour afficher le nombre de pommes qui ont été mangées jusqu'à présent
- eaten_apples, reçoit le nombre de pommes qui ont été mangées jusqu'à présent
- current_score, reçoit la valeur du score courant
- end_game_score, reçoit la valeur du score une fois la partie terminer (pour l'afficher dans la modal de fin de partie)

**DESCRIPTION DES METHODES: (4)**

- **init()**, à l'initialisation on va chercher le meilleur score
- **get_best_score()**, une simple condition va vérifier si il y a un best score dans le local storage et l'attribuer à la balise correspondante
- **set_best_score()**, ici on va mettre le meilleur score à jour
    - une condition vérifie si best score est présent dans le local storage
        - une seconde condition va vérifier si ce score est inférieur au score courant
            - si c'est le cas on met à jour la valeur du best score en l'écrasant avec le nouveau score
    - si il n'y a pas de best score dans le local storage
        - on le crée avec la valeur du score de la partie qui vient d'être terminée
    - on va réinitialiser toutes les valeurs de l'objet en les rapassant à 0
    - et afficher le score de fin de partie dans la modale
- **update_score()**, ici on va calculer le nombre de points marqués à chaque pomme mangée par le serpent et l'ajouter au score total 

## VI song.js

Ce fichier contient un objet song qui nous permet de jouer un son lorsqu'une pomme est mangée par le serpent   
il nous permet également de gérer l'activation/désactivation du son par l'utilisateur à l'aide d'un bouton   

**DESCRIPTION DES PROPRIETES: (3)**

- on_off, défini à l'aide d'une valeur binaire si le son est "on" ou "off" 1 = "on" 0 = "off"
- on_svg, contient la balise affichée lorsque le son est "on" fait office de bouton pour changer l'état à "off"
- off_svg, contient la balise affichée lorsque le son est "off" fait office de bouton pour changer l'état à "on"

**DESCRIPTION DES METHODES: (4)**

- **init()**, ajoute les handler qui écoute le clique sur les balises image "on" et "off"
- **eaten_apple()**, la méthode est jouée lorsqu'une pomme est mangée
    - on crée un nouvel audio à l'aide de la classe Audio native à js
    - on ajoute une source à notre audio (ici un fichier mp3 qui contient le son que l'on veut jouer)
    - si le son est activé
        - on applique la méthode play() à notre son ce qui permet de la jouer
        - sinon on ne fait rien
- **handle_on_svg()**, 
    - ajoute l'évènement clique sur la balise on_svg
    - cache la balise on_svg
    - affiche la balise off_svg 
    - passe la propriété on_off à 0 (plus de son)

- **handle_off_svg()**, fonctionne comme handle_on_svg sauf que tout est inversé