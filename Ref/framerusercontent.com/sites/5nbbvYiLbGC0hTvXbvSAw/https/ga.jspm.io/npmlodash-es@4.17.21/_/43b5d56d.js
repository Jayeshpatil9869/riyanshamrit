/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(n) {
    return function(r) {
        return n(r)
    }
}
export {
    baseUnary as b
};

//# sourceMappingURL=43b5d56d.js.map