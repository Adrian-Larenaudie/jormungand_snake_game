# CONVENTION DES COMMITS POUR CE PROJET:

## **Les commits sont en anglais**

### Ils commencent par un mot clef et peuvent en contenir plusieurs  
- DONE step x = l'étape numéro x a été réalisée  
- FIX = des modification liées à un dysfonctionnement ont été faite sur  
- WIP step x = le travail est en cours sur l'étape x   
- COMMENT = des commentaires ont été ajouté  
- ADD = un ou plusieurs ajout ont été effectués
- CREATE = un élément à été crée
- DOC = il s'agit de documentation
- CHANGE = des changements ont étés effectués  
- RENAME = fichier ou fonction qui a ou ont été rénomés 
- MERGE = fusion de fichier ou fonction
- SPLIT = séparation de fichier ou fonction

Les mots clefs sont suivit du fichier/fonction/méthode qui a subit des modifications.  
Puis un message facultatif peut être ajouté en troisème éléments on écrit msg: suivit du commentaire.  

### **Exemple d'un commit:**  
`CREATE + WIP step 0 + COMMENT: hello_world(), msg: don't say hello; CREATE + DOC: commit_convenant.md, msg: commit covenant explanations;` 

### **On peut traduire ce commit comme ceci:**  
`CREATE` la fonction hello_world() vient d'être créee,   
`WIP step 0` elle n'est pas terminée et il s'agit de l'étape 0 dans le déroulé de l'avancement du projet,   
`COMMENT` des commentaires ont été ajoutés sur cette fonction,  
`msg: don't say hello yet` un message facultatif nous dis que la fonction ne dis pas encore bonjour,  
`;` le point virgule après un sujet abordé on le termine par un point virgule pour le séparer du reste du commit  
`CREATE` le fichier commit_convenant.md a été crée,  
`DOC` il s'agit d'un fichier de documentation,   
`msg: commit covenant explanations;` commentaire facultatif il s'agit d'un fichier lié à la convention des commits.  

