import r from "../isObject.js";
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(t) {
    return t === t && !r(t)
}
export {
    isStrictComparable as i
};

//# sourceMappingURL=7e89d739.js.map