import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import e from "./isObjectLike.js";
import "./_/7953e050.js";
import "./_/e52eecc0.js";
import t from "./isPlainObject.js";
/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(i) {
    return e(i) && 1 === i.nodeType && !t(i)
}
export default isElement;

//# sourceMappingURL=isElement.js.map