import {
    b as r
} from "./c8f2469a.js";
import {
    c as a
} from "./16393db3.js";
import {
    h as o
} from "./1386403c.js";
import {
    s
} from "./0b311353.js";
import {
    b as i
} from "./01736674.js";
import {
    s as t
} from "./5430d57b.js";
var m = Math.ceil;
/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */
function createPadding(e, c) {
    c = void 0 === c ? " " : r(c);
    var f = c.length;
    if (f < 2) return f ? i(c, e) : c;
    var n = i(c, m(e / t(c)));
    return o(c) ? a(s(n), 0, e).join("") : n.slice(0, e)
}
export {
    createPadding as c
};

//# sourceMappingURL=1b8f7435.js.map