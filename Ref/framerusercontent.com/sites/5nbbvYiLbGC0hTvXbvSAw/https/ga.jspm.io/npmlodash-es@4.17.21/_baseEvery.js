import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
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
import "./_/874eb754.js";
import "./_/5f448d66.js";
import "./_baseForOwn.js";
import "./_/c8460b3f.js";
import {
    b as r
} from "./_/4b1fb593.js";
/**
 * The base implementation of `_.every` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(s, i) {
    var t = true;
    r(s, (function(r, s, o) {
        t = !!i(r, s, o);
        return t
    }));
    return t
}
export default baseEvery;

//# sourceMappingURL=_baseEvery.js.map