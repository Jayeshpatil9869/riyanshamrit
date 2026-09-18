import {
    i as t
} from "./98062778.js";
/**
 * The base implementation of `_.nth` which doesn't coerce arguments.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {number} n The index of the element to return.
 * @returns {*} Returns the nth element of `array`.
 */
function baseNth(r, a) {
    var e = r.length;
    if (e) {
        a += a < 0 ? e : 0;
        return t(a, e) ? r[a] : void 0
    }
}
export {
    baseNth as b
};

//# sourceMappingURL=841bb6c0.js.map