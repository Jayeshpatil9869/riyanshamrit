import {
    b as e
} from "./c96a0489.js";
/**
 * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @param {number} [size=array.length] The size of `array`.
 * @returns {Array} Returns `array`.
 */
function shuffleSelf(f, l) {
    var r = -1,
        s = f.length,
        t = s - 1;
    l = void 0 === l ? s : l;
    while (++r < l) {
        var a = e(r, t),
            h = f[a];
        f[a] = f[r];
        f[r] = h
    }
    f.length = l;
    return f
}
export {
    shuffleSelf as s
};

//# sourceMappingURL=203a09f2.js.map