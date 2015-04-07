module.exports = function (obj, other) {
    for (var item in other) {
        //arguments.callee(obj[item], other[item])
        //if (obj[item]) {
        //    arguments.callee(obj[item], other[item])
        //} else {
        //    obj[item] = other[item]
        //}
        obj[item] = other[item]
    }
}