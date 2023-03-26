"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inverse = exports.isEqual = exports.add = void 0;
function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}
exports.add = add;
function isEqual(a, b) {
    return a.x === b.x && a.y === b.y;
}
exports.isEqual = isEqual;
function inverse(a) {
    return { x: -a.x, y: -a.y };
}
exports.inverse = inverse;
//# sourceMappingURL=point.js.map