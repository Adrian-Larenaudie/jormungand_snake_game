## Jormungand

**Un jeu snake classique en JavaScript vanilla.**

En ligne avec Surge ici: **https://jormungand-game-adrian.surge.sh**  

Le jeu utilise la balise HTML canvas, à chaque modification l'ensemble du jeu est redessiné ce qui donne l'illusion du mouvement.  

Fonctionnement macro: 
- au départ le serpent fait 4 cases de long
- il se déplace continnuellement
- une pomme est générée aléatoirement
- si la tête du serpent arrive sur la pomme la pomme est mangée par le serpent et celui ci gandit d'une case
- si le serpent se mord la queue la partie est terminée
- un score ainsi que le nombre de pomme mangée sont affichés à l'écran
- le meilleure score est gardé en mémoire dans le local storage
- un bruit de pomme croquée est joué lorsqu'une pomme est mangée, le son peut être arrêté par l'utilisateur à l'aide d'un bouton
- un panneau informatif indique les touches utilisables en jeu
- ZQSD pour changer la direction
- barre espace pour mettre le jeu en pause

