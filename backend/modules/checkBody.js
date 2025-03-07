// Deuxième version de CheckBody utilisée pour la route "updateByToken"
// ajout d'obj[element].length===0 car sans, un tableau vide de participants/ groups peut être envoyé en bdd

function checkBody(obj, arr, optionalFields = []) {
    for (let element of arr) {
      // Ignore les champs optionnels qui ne sont pas dans l'objet
      if (optionalFields.includes(element) && !Object.keys(obj).includes(element)) {
        continue;
      }
      
      // Vérifie que le champ existe et n'est pas vide
      if (!Object.keys(obj).includes(element) || 
          (Array.isArray(obj[element]) && obj[element].length === 0 && !optionalFields.includes(element))) {
        console.log(`Champ manquant ou vide: ${element}`);
        return false;
      }
    }
    
    return true;
  }
  

// // Object.values(obj) = récupère toutes les valeurs de obj sous forme de tableau
// //every = vérifie sur chaque élément du tableau la condition est vrai ou fausse,d'abord il vérifie que value existe et n'est pas null ou undefined, ensuite il convertit cette valeur en string et supprime tous les espaces puis vérifie une dernière fois si value est vide (Cela permet d'éviter de  créer un compte seulement avec des espaces) '
// return Object.values(obj).every(value => value && value.toString().trim() !== "");

module.exports = { checkBody };