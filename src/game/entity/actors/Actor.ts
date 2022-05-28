import { Container } from 'pixi.js';
import Entity from '../Entity';

export default abstract class Actor<
    T extends Container = Container
> extends Entity<T> {

    // TODO eventy:

    protected _speed = 2;
    protected _health = 100;

    public get speed(): number {
        return this._speed;
    }

    public set speed(value: number) {
        this._speed = value;
    }

    public move(dx: number, dy: number) {
        const board = this.context.board;
        const bbox = this.bbox;

        let newX = this.renderable.x;
        let newY = this.renderable.y;

        if (dx != 0) {
            const shiftedBbox = bbox.shiftX(dx);

            if (!board.testCollision(shiftedBbox)) {
                newX = shiftedBbox.x0;
            } else {
                // const dirx = Math.sign(dx);

                // if (dirx > 0) {
                //     const row = Math.round(this.sprite.x / board.cellSize);
                // } else {
                //     const row = Math.round(this.sprite.x / board.cellSize);
                // }
            }
        }

        if (dy != 0) {
            const shiftedBbox = bbox.shiftY(dy);

            if (!board.testCollision(shiftedBbox)) {
                newY = shiftedBbox.y0;
            } else {
                // const diry = Math.sign(dy);
            }
        }

        this.renderable.x = newX;
        this.renderable.y = newY;
    }

}