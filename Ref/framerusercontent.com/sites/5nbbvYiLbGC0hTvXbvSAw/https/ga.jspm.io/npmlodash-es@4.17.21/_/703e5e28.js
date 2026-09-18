/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(a, l, e) {
    switch (e.length) {
        case 0:
            return a.call(l);
        case 1:
            return a.call(l, e[0]);
        case 2:
            return a.call(l, e[0], e[1]);
        case 3:
            return a.call(l, e[0], e[1], e[2])
    }
    return a.apply(l, e)
}
export {
    apply as a
};

//# sourceMappingURL=703e5e28.js.map