import {
    b as r
} from "./5e6974a5.js";
import {
    a as o
} from "./60d30700.js";
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(a, t, e, c) {
    var i = !e;
    e || (e = {});
    var v = -1,
        p = t.length;
    while (++v < p) {
        var s = t[v];
        var j = c ? c(e[s], a[s], s, e, a) : void 0;
        void 0 === j && (j = a[s]);
        i ? r(e, s, j) : o(e, s, j)
    }
    return e
}
export {
    copyObject as c
};

//# sourceMappingURL=8dfaf20e.js.map