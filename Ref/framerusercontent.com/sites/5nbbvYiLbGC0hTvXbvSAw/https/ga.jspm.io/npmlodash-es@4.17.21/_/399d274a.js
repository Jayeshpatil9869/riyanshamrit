import {
    t as r
} from "./2a83f3a2.js";
var a = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(e) {
    return e ? e.slice(0, r(e) + 1).replace(a, "") : e
}
export {
    baseTrim as b
};

//# sourceMappingURL=399d274a.js.map