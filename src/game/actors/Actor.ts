import { Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import BoundingBox from '../collision/BoundingBox';
import { HasBoundingBox } from '../collision/HasBoundingBox';
import GameContext from '../GameContext';
import { Renderable } from '../Renderable';

export default abstract class Actor<
    S extends Sprite = Sprite
> implements Renderable, HasBoundingBox {

    // TODO eventy:

    public readonly context: GameContext;

    protected _speed = 2;
    protected _healh = 100;

    public constructor(context: GameContext) {
        this.context = context;
    }

    public get renderable() {
        return this.sprite;
    }

    public get bbox() {
        const { x, y, width, height } = this.sprite;
        return BoundingBox.fromDims(x, y, width, height);
    }

    public get nearestCell() {
        const board = this.context.board;
        const cellSize = board.cellSize;

        return board.getCellAt(
            Math.round(this.sprite.x / cellSize),
            Math.round(this.sprite.y / cellSize)
        );
    }

    public get speed(): number {
        return this._speed;
    }

    public set speed(value: number) {
        this._speed = value;
    }

    public move(dx: number, dy: number) {
        const board = this.context.board;
        const bbox = this.bbox;

        let newX = this.sprite.x;
        let newY = this.sprite.y;

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

        this.sprite.x = newX;
        this.sprite.y = newY;
    }

    public setPosition(cell: BoardCell) {
        if (!cell.isWall) {
            cell.alignObject(this.sprite);
        }
    }

    protected abstract get sprite(): S;

}