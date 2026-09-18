var t = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(o) {
    var r = o && o.constructor,
        e = "function" == typeof r && r.prototype || t;
    return o === e
}
export {
    isPrototype as i
};

//# sourceMappingURL=df9293ee.js.map