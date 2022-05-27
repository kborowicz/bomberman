import Point from './Point';

export default class Rectangle {

    public readonly p1: Point;
    public readonly p2: Point;

    public constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
    }

    public get x0() {
        return this.p1.x;
    }

    public get y0() {
        return this.p1.y;
    }

    public get x1() {
        return this.p2.x;
    }

    public get y1() {
        return this.p2.y;
    }

    public shift(dx: number, dy: number) {
        const { x0, y0, x1, y1 } = this;
        return Rectangle.fromCoords(x0 + dx, y0 + dy, x1 + dx, y1 + dy);
    }

    public shiftX(dx: number) {
        const { x0, y0, x1, y1 } = this;
        return Rectangle.fromCoords(x0 + dx, y0, x1 + dx, y1);
    }

    public shiftY(dy: number) {
        const { x0, y0, x1, y1 } = this;
        return Rectangle.fromCoords(x0, y0 + dy, x1, y1 + dy);
    }

    public intersectsRect(rect: Rectangle): boolean {
        // If one rectangle is on left side of other
        if (this.p1.x > rect.p2.x || rect.p1.x > this.p2.x) {
            return false;
        }

        // If one rectangle is above other
        if (this.p2.y > rect.p1.y || rect.p2.y > this.p1.y) {
            return false;
        }

        return true;
    }

    public intersectionFactorX(rect: Rectangle): number {
        return Math.min(Math.abs(rect.p2.x - this.p1.x), Math.abs(this.p2.x - rect.p1.x));
    }

    public intersectionFactorY(rect: Rectangle): number {
        return Math.min(Math.abs(rect.p2.y - this.p1.y), Math.abs(this.p2.y - rect.p1.y));
    }

    public static fromCoords(x0: number, y0: number, x1: number, y1: number) {
        return new Rectangle(new Point(x0, y0), new Point(x1, y1));
    }

    public static fromSize(x0: number, y0: number, size: number) {
        return new Rectangle(new Point(x0, y0), new Point(x0 + size, y0 + size));
    }

}