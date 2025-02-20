function checkBody(obj) {
// V1
//     let resultArr = [];

//     for (let element of arr) {
//         resultArr.push(Object.keys(obj).includes(element))
//     }

// return resultArr.every((value) => value === true);

// Object.values(obj) = récupère toutes les valeurs de obj sous forme de tableau
//every = vérifie sur chaque élément du tableau la condition est vrai ou fausse,d'abord il vérifie que value existe et n'est pas null ou undefined, ensuite il convertit cette valeur en string et supprime tous les espaces puis vérifie une dernière fois si value est vide (Cela permet d'éviter de  créer un compte seulement avec des espaces) '
return Object.values(obj).every(value => value && value.toString().trim() !== "");

}

module.exports = { checkBody };