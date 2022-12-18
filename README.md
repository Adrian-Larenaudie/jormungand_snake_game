## Jormungand

**C'est un jeu snake classique codé en JavaScript vanilla.**

En ligne avec Surge ici: **https://jormungand-game-adrian.surge.sh**  

Le jeu utilise la balise HTML canvas, à chaque modification l'ensemble du jeu est redessiné ce qui donne l'illusion du mouvement.  

Les règles de mon snake sont simples et reprennent celles du jeu original avec sans doute quelques variations:  
- au départ le serpent fait 4 cases de long
- il se déplace continnuellement
- une pomme est générée aléatoirement
- si la tête du serpent arrive sur la pomme la pomme est mangée par le serpent et celui ci gandit d'une case
- si le serpent se mord la queue la partie est terminée
- il y a un système de score ainsi que le nombre de pomme mangée qui sont affichés à l'écran
- il y a une sauvegarde du meilleure score faite dans le local storage
- un bruit de pomme croquée est joué lorsqu'une pomme est mangée, le son peut être coupé par l'utilisateur à l'aide d'un bouton
- un panneau informatif indique les touches utilisables en jeu
- ZQSD pour changer la direction
- barre espace pour mettre le jeu en pause

## TODO  

-> ajouter la doc sur la nouvelle feature de la pause:  
    -> la propriété game.running  
    -> la méthode game.manage_pause()  
    -> la méthode game.on_visibility_change_page_event_handler()  

-> rendre l'application responsive  
