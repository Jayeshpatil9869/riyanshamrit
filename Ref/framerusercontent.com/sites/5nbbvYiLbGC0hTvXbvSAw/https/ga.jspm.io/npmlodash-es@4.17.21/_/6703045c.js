/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(r) {
    var a = -1,
        o = Array(r.size);
    r.forEach((function(r, n) {
        o[++a] = [n, r]
    }));
    return o
}
export {
    mapToArray as m
};

//# sourceMappingURL=6703045c.js.map