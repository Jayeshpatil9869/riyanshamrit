/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(r, n) {
    return function(o) {
        return r(n(o))
    }
}
export {
    overArg as o
};

//# sourceMappingURL=7953e050.js.map