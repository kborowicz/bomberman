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
    }

    public align(cell: BoardCell) {
        cell.alignObject(this);
    }

}