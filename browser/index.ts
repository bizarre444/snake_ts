import { Render } from "./render";

const canvas = document.getElementById("field") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
    const randy = new Render(ctx, 20);
    randy.drawEmpty({x: 0, y: 0});
    randy.drawSnakeCell({x: 1, y: 1});
    randy.drawFoodCell({x: 0, y: 1});
}