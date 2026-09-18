import t from "../isObject.js";
var r = Object.create;
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var e = function() {
    function object() {}
    return function(e) {
        if (!t(e)) return {};
        if (r) return r(e);
        object.prototype = e;
        var o = new object;
        object.prototype = void 0;
        return o
    }
}();
export {
    e as b
};

//# sourceMappingURL=865f4d28.js.map