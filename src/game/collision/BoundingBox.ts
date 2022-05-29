import { CollisionTest } from './CollisionTest';
import Point from './Point';

export default class BoundingBox implements CollisionTest {

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

    public get cx() {
        return (this.x0 + this.x1) / 2;
    }

    public get cy() {
        return (this.y0 + this.y1) / 2;
    }

    public shift(dx: number, dy: number) {
        const { x0, y0, x1, y1 } = this;
        return BoundingBox.fromCoords(x0 + dx, y0 + dy, x1 + dx, y1 + dy);
    }

    public shiftX(dx: number) {
        const { x0, y0, x1, y1 } = this;
        return BoundingBox.fromCoords(x0 + dx, y0, x1 + dx, y1);
    }

    public shiftY(dy: number) {
        const { x0, y0, x1, y1 } = this;
        return BoundingBox.fromCoords(x0, y0 + dy, x1, y1 + dy);
    }

    public testCollision(bbox: BoundingBox): boolean {
        // If one rectangle is on left side of other
        if (this.p1.x > bbox.p2.x || bbox.p1.x > this.p2.x) {
            return false;
        }

        // If one rectangle is above other
        if (this.p2.y > bbox.p1.y || bbox.p2.y > this.p1.y) {
            return false;
        }

        return true;
    }

    public getIntersection(bbox: BoundingBox) {
        const x0 = Math.max(this.x0, bbox.x0);
        const y0 = Math.max(this.y0, bbox.y0);
        const x1 = Math.min(this.x1, bbox.x1);
        const y1 = Math.min(this.y1, bbox.y1);

        return [x1 - x0, y1 - y0];
    }

    public static fromCoords(x0: number, y0: number, x1: number, y1: number) {
        return new BoundingBox(new Point(x0, y0), new Point(x1, y1));
    }

    public static fromDims(x0: number, y0: number, w: number, h: number) {
        return new BoundingBox(new Point(x0, y0), new Point(x0 + w, y0 + h));
    }

}