import { Sprite } from 'pixi.js';
import Board from '../board/Board';
import BoxCollider from '../collision/colliders/BoxCollider';
import { HasCollider } from '../collision/HasCollider';
import Rectangle from '../collision/shapes/Rectangle';
import { Renderable } from '../Renderable';

export default abstract class Actor<
    S extends Sprite = Sprite,
> implements Renderable, HasCollider<BoxCollider> {

    protected board: Board;

    public constructor(board: Board) {
        this.board = board;
    }

    protected abstract get sprite(): S;

    public get renderable() {
        return this.sprite;
    }

    public get collider() {
        const {x, y, width, height} = this.sprite;

        return new BoxCollider(
            Rectangle.fromCoords(x, y, x + width, y + height)
        );
    }

    public get nearestCell() {
        const cellSize = this.board.cellSize;

        return this.board.getCellAt(
            Math.round(this.sprite.x / cellSize),
            Math.round(this.sprite.y / cellSize)
        );
    }

    public move(dx: number, dy: number) {
        const { board, collider } = this;
        let newCollider = collider;

        if (dx != 0) {
            const shiftedCollider = collider.shiftX(dx);

            if (!board.collider.testCollision(shiftedCollider)) {
                newCollider = shiftedCollider;
            }
        }

        if (dy != 0) {
            const shiftedCollider = collider.shiftX(dy);

            if (!board.collider.testCollision(shiftedCollider)) {
                newCollider = shiftedCollider;
            }
        }

        this.sprite.x = newCollider.box.x0;
        this.sprite.y = newCollider.box.y0;
    }

}