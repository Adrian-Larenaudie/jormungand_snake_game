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

**3eme étapes = crée le corps du serpent:** ok
- créer un corps au serpent, en comptant la tête par défaut 4 cases ok
- les cases body doivent se suivre lors des déplacements de la tête ok
- il n'ai désormais plus possible d'être bloqué par une bordure à la place la tête doit se retrouver de l'autre coté de la grille ok