import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import r from "./isArray.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import i from "./toInteger.js";
import "./isFunction.js";
import s from "./_copyArray.js";
import "./_/98062778.js";
import "./eq.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i as t
} from "./_/196bc89c.js";
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
import {
    b as o
} from "./_/b1d05723.js";
import "./_/f92f157a.js";
import m from "./values.js";
import "./_/c96a0489.js";
import {
    s as p
} from "./_/203a09f2.js";
/**
 * A specialized version of `_.sampleSize` for arrays.
 *
 * @private
 * @param {Array} array The array to sample.
 * @param {number} n The number of elements to sample.
 * @returns {Array} Returns the random elements.
 */
function arraySampleSize(r, i) {
    return p(s(r), o(i, 0, r.length))
}
/**
 * The base implementation of `_.sampleSize` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to sample.
 * @param {number} n The number of elements to sample.
 * @returns {Array} Returns the random elements.
 */
function baseSampleSize(r, i) {
    var s = m(r);
    return p(s, o(i, 0, s.length))
}
/**
 * Gets `n` random elements at unique keys from `collection` up to the
 * size of `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * _.sampleSize([1, 2, 3], 2);
 * // => [3, 1]
 *
 * _.sampleSize([1, 2, 3], 4);
 * // => [2, 3, 1]
 */
function sampleSize(s, o, m) {
    o = (m ? t(s, o, m) : void 0 === o) ? 1 : i(o);
    var p = r(s) ? arraySampleSize : baseSampleSize;
    return p(s, o)
}
export default sampleSize;

//# sourceMappingURL=sampleSize.js.map