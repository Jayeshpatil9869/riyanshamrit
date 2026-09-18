/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(r) {
    var a = -1,
        o = Array(r.size);
    r.forEach((function(r) {
        o[++a] = r
    }));
    return o
}
export {
    setToArray as s
};

//# sourceMappingURL=f01ae9b5.js.map