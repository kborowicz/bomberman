import { Container } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';

export default class CellSprite extends Container {

    protected readonly cellSize: number;

    public constructor(cellSize: number) {
        super();

        this.cellSize = cellSize;
        this.width = cellSize;
        this.height = cellSize;
        this.sortableChildren = true;
    }

    public addAndFill(renderable: Container) {
        renderable.width = this.cellSize;
        renderable.height = this.cellSize;
        this.addChild(renderable);

        return this;
    }

    public addAndCenter(renderable: Container) {
        const cellSize = this.cellSize;
        const x0 = this.x;
        const y0 = this.y;

        const w = renderable.width;
        const h = renderable.height;

        renderable.x = x0 + (cellSize - w) / 2;
        renderable.y = y0 + (cellSize - h) / 2;

        this.addChild(renderable);

        return this;
    }

    public align(cell: BoardCell) {
        cell.alignObject(this);

        return this;
    }

}