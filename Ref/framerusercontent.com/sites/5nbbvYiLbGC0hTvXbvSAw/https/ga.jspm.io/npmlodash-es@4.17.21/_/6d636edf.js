import {
    c as r
} from "./0f88f209.js";
import {
    b as a
} from "./59d1abe4.js";
import {
    b as s
} from "./6c34ab6b.js";
/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(b, o, e) {
    var i = -1,
        t = o.length,
        f = {};
    while (++i < t) {
        var m = o[i],
            c = a(b, m);
        e(c, m) && s(f, r(m, b), c)
    }
    return f
}
export {
    basePickBy as b
};

//# sourceMappingURL=6d636edf.js.map