"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.NumericService = void 0;
var mod_1 = require("../util/mod");
var NumericService = /** @class */ (function () {
    function NumericService() {
    }
    NumericService.prototype.extendedGCD = function (a, b) {
        if (a < b) {
            var temp = b;
            b = a;
            a = temp;
        }
        if (b == 0) {
            return [a, 1, 0];
        }
        else {
            var _a = __read(this.extendedGCD(b, (0, mod_1.mod)(a, b)), 3), gcd = _a[0], x1 = _a[1], y1 = _a[2];
            var x = y1;
            var y = x1 - Math.floor(a / b) * y1;
            return [gcd, x, y];
        }
    };
    NumericService.prototype.getInverseModulo = function (a, n) {
        var _a = __read(this.extendedGCD(a, n), 3), gcd = _a[0], _ = _a[1], inverseModulo = _a[2];
        return gcd === 1 ? inverseModulo : null;
    };
    NumericService.prototype.solveModuloComparison = function (a, b, n) {
        var _a = __read(this.extendedGCD(a, n), 3), gcd = _a[0], _ = _a[1], inverseModule = _a[2];
        if (gcd === 1) {
            return (0, mod_1.mod)((inverseModule * b), n);
        }
        if (b % gcd !== 0) {
            return null;
        }
        a = a / gcd;
        b = b / gcd;
        n = n / gcd;
        var x_0 = (0, mod_1.mod)((this.getInverseModulo(a, n) * b), n);
        return Array.from({ length: gcd }, function (_, i) { return x_0 + i * n; });
    };
    return NumericService;
}());
exports.NumericService = NumericService;
