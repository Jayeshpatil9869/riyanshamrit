var t = "Expected a function";
/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(e) {
    if ("function" != typeof e) throw new TypeError(t);
    return function() {
        var t = arguments;
        switch (t.length) {
            case 0:
                return !e.call(this);
            case 1:
                return !e.call(this, t[0]);
            case 2:
                return !e.call(this, t[0], t[1]);
            case 3:
                return !e.call(this, t[0], t[1], t[2])
        }
        return !e.apply(this, t)
    }
}
export default negate;

//# sourceMappingURL=negate.js.map