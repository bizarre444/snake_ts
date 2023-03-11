console.log("Hello world!");
var CellType;
(function (CellType) {
    CellType[CellType["Empty"] = 0] = "Empty";
    CellType[CellType["SnakeBody"] = 1] = "SnakeBody";
    CellType[CellType["Food"] = 2] = "Food";
})(CellType || (CellType = {}));
var Render = /** @class */ (function () {
    function Render(context, cellSizePx, fieldSize) {
        this.context = context;
        this.cellSizePx = cellSizePx;
        this.fieldSize = fieldSize;
    }
    Render.prototype.drawEmpty = function (coord) {
        this.context.fillStyle = "gray";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    };
    Render.prototype.drawSnake = function (coord) {
        this.context.fillStyle = "green";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    };
    Render.prototype.drawFood = function (coord) {
        this.context.fillStyle = "yellow";
        this.context.fillRect(coord.x * this.cellSizePx, coord.y * this.cellSizePx, this.cellSizePx, this.cellSizePx);
    };
    return Render;
}());
var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");
if (ctx) {
    var randy = new Render(ctx, 20, { height: 10, width: 10 });
    randy.drawEmpty({ x: 0, y: 0 });
    randy.drawSnake({ x: 1, y: 1 });
    randy.drawFood({ x: 0, y: 1 });
}
