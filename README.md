## Jormungand 

**1ere étape = créer une grille dans la balise canvas à l'aide d'une fonction: make_grid()** OK

**Notes:** concernant les imports exports:  
    - les navigateur ne supportent pas la syntaxe des require() de node js  
    - pour gérer ses imports et exports, on utilisera la syntaxe ES6   
    - mots clef: ``import from export default``  
    - documentation: https://bobbyhadz.com/blog/javascript-referenceerror-require-is-not-defined  

**2eme étape = créer la tête du serpent:** ok
- elle avance vers l'avant de une case toutes les 200 millisecondes ok
- elle ne peut pas sortir de la grille ok
- elle peut changer de direction à l'aide des touches ZQSD ok

**3eme étape = crée le corps du serpent:** ok
- créer un corps au serpent, en comptant la tête par défaut 4 cases ok
- les cases body doivent se suivre lors des déplacements de la tête ok
- il n'ai désormais plus possible d'être bloqué par une bordure à la place la tête doit se retrouver de l'autre coté de la grille ok

**4eme étape = les pommes:** OK
- faire apparaitre une pomme à un emplacement aléatoire de la grille au bout de 2000 milliseconde après le début de la partie ok
- la pomme ne doit pas apparaitre sur le serpent ok
- la pomme est mangée par le serpent si sa tête arrive sur la case de la pomme ok
- une fois qu'une pomme est mangée le serpent grandit d'une case ok

**5eme étape = gérer les conditions de fin de partie + scoring system** WIP
- faire en sorte que lorsque le serpent se mort la queue un msg s'affiche la partie est perdu on relance le game
- ajouter un système de scoring visible en cours de partie:
  - une pomme manger rapporte 1point multiplier par le nombre de parti du serpent
  
**6eme étape = créer une interface de lancement de partie**

**7eme étape = design**