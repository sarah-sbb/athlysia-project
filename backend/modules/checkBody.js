function checkBody(obj, arr) {

    let resultArr = [];

    for (let element of arr) {
        resultArr.push(Object.keys(obj).includes(element))
    }

return resultArr.every((value) => value === true);

}

module.exports = { checkBody };