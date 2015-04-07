module.exports = function (obj, other) {
    for (var item in other) {
        if (obj[item]) {
            arguments.callee(obj[item], other[item])
        } else {
            obj[item] = other[item]
        }
    }
}