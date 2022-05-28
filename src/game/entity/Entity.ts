import { Container, DisplayObject } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import BoundingBox from '../collision/BoundingBox';
import { HasBoundingBox } from '../collision/HasBoundingBox';
import GameContext from '../GameContext';
import { Renderable } from '../Renderable';

export default abstract class Entity<
    T extends Container = Container
> implements Renderable<T>, HasBoundingBox {

    public readonly context: GameContext;

    public constructor(context: GameContext) {
        this.context = context;
    }

    public get bbox() {
        const { x, y, width, height } = this.renderable;
        return BoundingBox.fromDims(x, y, width, height);
    }

    public get nearestCell() {
        const board = this.context.board;
        const cellSize = board.cellSize;
        const { x0: cx, y0: cy } = this.bbox; //TODO jak to ogarnac zeby dzialalo poruszanie

        return board.getCellAt(
            Math.round(cx / cellSize),
            Math.round(cy / cellSize)
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

    public abstract get renderable(): T;

}