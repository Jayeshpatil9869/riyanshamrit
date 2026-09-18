/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(t) {
    var l = null == t ? 0 : t.length;
    return l ? t[l - 1] : void 0
}
export default last;

//# sourceMappingURL=last.js.map