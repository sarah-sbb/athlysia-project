// Deuxième version de CheckBody utilisée pour la route "updateByToken"

function checkBody(obj, arr) {

    for (let element of arr) {
        if (!Object.keys(obj).includes(element)) {
            return false
        }
    }

return true;

// // Object.values(obj) = récupère toutes les valeurs de obj sous forme de tableau
// //every = vérifie sur chaque élément du tableau la condition est vrai ou fausse,d'abord il vérifie que value existe et n'est pas null ou undefined, ensuite il convertit cette valeur en string et supprime tous les espaces puis vérifie une dernière fois si value est vide (Cela permet d'éviter de  créer un compte seulement avec des espaces) '
// return Object.values(obj).every(value => value && value.toString().trim() !== "");

}

module.exports = { checkBody };