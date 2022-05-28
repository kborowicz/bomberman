import { BoardCell } from '@/game/board/BoardCell';
import { Container } from 'pixi.js';
import Entity from '../Entity';

export default abstract class Actor<
    T extends Container = Container
    > extends Entity<T> {

    // TODO eventy:

    private prevCell: BoardCell;

    protected _speed = 2;
    protected _health = 100;

    public get speed(): number {
        return this._speed;
    }

    public set speed(value: number) {
        this._speed = value;
    }

    public get nearestCell() {
        const board = this.context.board;
        const cellSize = board.cellSize;
        const { cx, cy } = this.bbox; //TODO jak to ogarnac zeby dzialalo poruszanie

        return board.getCellAt(
            Math.floor(cx / cellSize),
            Math.floor(cy / cellSize)
        );
    }

    public setPosition(col: number, row: number): void;
    public setPosition(cell: BoardCell): void;
    public setPosition(arg1: number | BoardCell, arg2?: number): void {
        let cell: BoardCell;

        if (typeof arg1 === 'number') {
            cell = this.context.board.getCellAt(arg1, arg2);
        } else {
            cell = arg1;
        }

        if (!cell.isWall) {
            cell.alignObject(this.renderable);
        }
    }

    public move(dx: number, dy: number) {
        const board = this.context.board;
        const bbox = this.bbox;

        let newX = this.renderable.x;
        let newY = this.renderable.y;

        if (this.nearestCell != this.prevCell) {
            console.log(this.nearestCell);
            this.prevCell = this.nearestCell;
        }

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