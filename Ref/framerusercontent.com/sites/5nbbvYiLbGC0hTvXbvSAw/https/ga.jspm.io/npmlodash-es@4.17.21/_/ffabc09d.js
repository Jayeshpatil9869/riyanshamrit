import r from "../_baseForOwn.js";
/**
 * The base implementation of `_.invert` and `_.invertBy` which inverts
 * `object` with values transformed by `iteratee` and set by `setter`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform values.
 * @param {Object} accumulator The initial inverted object.
 * @returns {Function} Returns `accumulator`.
 */
function baseInverter(e, n, t, o) {
    r(e, (function(r, e, c) {
        n(o, t(r), e, c)
    }));
    return o
}
/**
 * Creates a function like `_.invertBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} toIteratee The function to resolve iteratees.
 * @returns {Function} Returns the new inverter function.
 */
function createInverter(r, e) {
    return function(n, t) {
        return baseInverter(n, r, e(t), {})
    }
}
export {
    createInverter as c
};

//# sourceMappingURL=ffabc09d.js.map