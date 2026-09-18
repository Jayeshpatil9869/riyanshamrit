var e = 9007199254740991;
var a = Math.floor;
/**
 * The base implementation of `_.repeat` which doesn't coerce arguments.
 *
 * @private
 * @param {string} string The string to repeat.
 * @param {number} n The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 */
function baseRepeat(r, t) {
    var o = "";
    if (!r || t < 1 || t > e) return o;
    do {
        t % 2 && (o += r);
        t = a(t / 2);
        t && (r += r)
    } while (t);
    return o
}
export {
    baseRepeat as b
};

//# sourceMappingURL=01736674.js.map