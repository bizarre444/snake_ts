export interface Point {
    x: number;
    y: number;
}

export function add(a: Point, b: Point): Point {
    return {x: a.x + b.x, y: a.y + b.y};
}

export function isEqual(a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
}

export function inverse(a: Point): Point {
    return { x: -a.x, y: -a.y };
}