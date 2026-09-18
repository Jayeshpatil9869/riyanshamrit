import {
    r as t
} from "./f08a6ffe.js";
import {
    L as a,
    M as e
} from "./7c57ec77.js";
import {
    M as s
} from "./72487e58.js";

function stackClear() {
    this.__data__ = new a;
    this.size = 0
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(t) {
    var a = this.__data__,
        e = a.delete(t);
    this.size = a.size;
    return e
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(t) {
    return this.__data__.get(t)
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(t) {
    return this.__data__.has(t)
}
var i = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(t, r) {
    var _ = this.__data__;
    if (_ instanceof a) {
        var c = _.__data__;
        if (!s || c.length < i - 1) {
            c.push([t, r]);
            this.size = ++_.size;
            return this
        }
        _ = this.__data__ = new e(c)
    }
    _.set(t, r);
    this.size = _.size;
    return this
}
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(t) {
    var e = this.__data__ = new a(t);
    this.size = e.size
}
Stack.prototype.clear = stackClear;
Stack.prototype.delete = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var r = t.Uint8Array;
export {
    Stack as S, r as U
};

//# sourceMappingURL=0b247f18.js.map