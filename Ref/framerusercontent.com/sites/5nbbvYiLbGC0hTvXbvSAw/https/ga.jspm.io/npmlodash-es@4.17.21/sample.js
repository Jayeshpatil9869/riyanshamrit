import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./_arrayMap.js";
import r from "./isArray.js";
import "./isObject.js";
import "./isFunction.js";
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
import s from "./values.js";
import {
    b as i
} from "./_/c96a0489.js";
/**
 * A specialized version of `_.sample` for arrays.
 *
 * @private
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 */
function arraySample(r) {
    var s = r.length;
    return s ? r[i(0, s - 1)] : void 0
}
/**
 * The base implementation of `_.sample`.
 *
 * @private
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 */
function baseSample(r) {
    return arraySample(s(r))
}
/**
 * Gets a random element from `collection`.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 */
function sample(s) {
    var i = r(s) ? arraySample : baseSample;
    return i(s)
}
export default sample;

//# sourceMappingURL=sample.js.map