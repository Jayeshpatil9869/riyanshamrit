import {
    b as r
} from "./59d1abe4.js";
import {
    b as t
} from "./1d34989e.js";
/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(e, a) {
    return a.length < 2 ? e : r(e, t(a, 0, -1))
}
export {
    parent as p
};

//# sourceMappingURL=29a9b3d3.js.map