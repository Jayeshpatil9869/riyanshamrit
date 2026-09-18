var a = Math.floor,
    o = Math.random;
/**
 * The base implementation of `_.random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the random number.
 */
function baseRandom(n, r) {
    return n + a(o() * (r - n + 1))
}
export {
    baseRandom as b
};

//# sourceMappingURL=c96a0489.js.map