var e = "Expected a function";
/**
 * The base implementation of `_.delay` and `_.defer` which accepts `args`
 * to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Array} args The arguments to provide to `func`.
 * @returns {number|Object} Returns the timer id or timeout object.
 */
function baseDelay(t, n, o) {
    if ("function" != typeof t) throw new TypeError(e);
    return setTimeout((function() {
        t.apply(void 0, o)
    }), n)
}
export {
    baseDelay as b
};

//# sourceMappingURL=9db0989d.js.map