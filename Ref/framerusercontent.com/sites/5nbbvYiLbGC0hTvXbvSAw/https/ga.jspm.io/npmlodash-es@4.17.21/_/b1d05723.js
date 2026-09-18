/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(a, e, i) {
    if (a === a) {
        void 0 !== i && (a = a <= i ? a : i);
        void 0 !== e && (a = a >= e ? a : e)
    }
    return a
}
export {
    baseClamp as b
};

//# sourceMappingURL=b1d05723.js.map