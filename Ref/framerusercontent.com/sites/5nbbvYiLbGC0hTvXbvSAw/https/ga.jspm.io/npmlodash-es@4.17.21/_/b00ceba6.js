import r from "../get.js";
/**
 * The base implementation of `_.at` without support for individual paths.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {string[]} paths The property paths to pick.
 * @returns {Array} Returns the picked elements.
 */
function baseAt(t, e) {
    var a = -1,
        n = e.length,
        o = Array(n),
        i = null == t;
    while (++a < n) o[a] = i ? void 0 : r(t, e[a]);
    return o
}
export {
    baseAt as b
};

//# sourceMappingURL=b00ceba6.js.map