import {
    a as r
} from "./cf0de6d8.js";
import e from "../deburr.js";
import o from "../words.js";
var t = "['’]";
var a = RegExp(t, "g");
/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(t) {
    return function(m) {
        return r(o(e(m).replace(a, "")), t, "")
    }
}
export {
    createCompounder as c
};

//# sourceMappingURL=19aed38f.js.map