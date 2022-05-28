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

    public intersectionFactorX(bbox: BoundingBox): number {
        const r1x1 = this.p1.x;
        const r1x2 = this.p2.x;
        const r2x1 = bbox.p1.x;
        const r2x2 = bbox.p2.x;

        if (r2x1 >= r1x2 || r1x1 >= r2x2) {
            return 0;
        } else {
            if (r2x1 > r1x2) {
                return r2x1 - r1x2;
            } else {
                return r1x1 - r2x2;
            }
        }
    }

    public intersectionFactorY(bbox: BoundingBox): number {
        const r1y1 = this.p1.y;
        const r1y2 = this.p2.y;
        const r2y1 = bbox.p1.y;
        const r2y2 = bbox.p2.y;

        if (r2y1 >= r1y2 || r1y1 >= r2y2) {
            return 0;
        } else {
            if (r2y1 > r1y2) {
                return r2y1 - r1y2;
            } else {
                return r1y1 - r2y2;
            }
        }
    }

    public static fromCoords(x0: number, y0: number, x1: number, y1: number) {
        return new BoundingBox(new Point(x0, y0), new Point(x1, y1));
    }

    public static fromDims(x0: number, y0: number, w: number, h: number) {
        return new BoundingBox(new Point(x0, y0), new Point(x0 + w, y0 + h));
    }

}