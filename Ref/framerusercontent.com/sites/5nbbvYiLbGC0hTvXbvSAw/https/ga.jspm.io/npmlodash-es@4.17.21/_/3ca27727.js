import t from "../toNumber.js";
/**
 * Creates a function that performs a relational operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @returns {Function} Returns the new relational operation function.
 */
function createRelationalOperation(e) {
    return function(r, n) {
        if (!("string" == typeof r && "string" == typeof n)) {
            r = t(r);
            n = t(n)
        }
        return e(r, n)
    }
}
export {
    createRelationalOperation as c
};

//# sourceMappingURL=3ca27727.js.map