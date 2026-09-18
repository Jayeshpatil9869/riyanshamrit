import {
    b as r
} from "./4b1fb593.js";
/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(t, b) {
    var e = [];
    r(t, (function(r, t, s) {
        b(r, t, s) && e.push(r)
    }));
    return e
}
export {
    baseFilter as b
};

//# sourceMappingURL=101e7759.js.map