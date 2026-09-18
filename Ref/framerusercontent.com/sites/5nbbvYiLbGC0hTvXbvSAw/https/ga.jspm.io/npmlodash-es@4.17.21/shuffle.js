import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./_arrayMap.js";
import r from "./isArray.js";
import "./isObject.js";
import "./isFunction.js";
import s from "./_copyArray.js";
import "./_/98062778.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/d155b8cd.js";
import "./_/7953e050.js";
import "./_/48027737.js";
import "./keys.js";
import "./_/f92f157a.js";
import i from "./values.js";
import "./_/c96a0489.js";
import {
    s as t
} from "./_/203a09f2.js";
/**
 * A specialized version of `_.shuffle` for arrays.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function arrayShuffle(r) {
    return t(s(r))
}
/**
 * The base implementation of `_.shuffle`.
 *
 * @private
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function baseShuffle(r) {
    return t(i(r))
}
/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(s) {
    var i = r(s) ? arrayShuffle : baseShuffle;
    return i(s)
}
export default shuffle;

//# sourceMappingURL=shuffle.js.map