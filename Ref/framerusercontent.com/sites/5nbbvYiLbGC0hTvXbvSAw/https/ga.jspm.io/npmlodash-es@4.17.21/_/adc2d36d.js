import {
    i as r
} from "./98062778.js";
import {
    b as a
} from "./539e17c9.js";
var t = Array.prototype;
var e = t.splice;
/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt(t, l) {
    var o = t ? l.length : 0,
        s = o - 1;
    while (o--) {
        var i = l[o];
        if (o == s || i !== p) {
            var p = i;
            r(i) ? e.call(t, i, 1) : a(t, i)
        }
    }
    return t
}
export {
    basePullAt as b
};

//# sourceMappingURL=adc2d36d.js.map