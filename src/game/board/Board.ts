import { Container, Sprite } from 'pixi.js';
import { HasCollider } from '../collision/HasCollider';
import { Renderable } from '../Renderable';
import { BoardCell } from './BoardCell';
import BoardCellsTree from './BoardCellsTree';
import PathFinder from './PathFinder';

export interface IBoardProps {
    cellSize?: number
}

export default class Board implements Renderable, HasCollider {

    private readonly cellsContainer: Container;

    public readonly pathFinder: PathFinder;
    public readonly cellsTree: BoardCellsTree;
    public readonly cellSize: number;

    public constructor(props: IBoardProps = null) {
        const { cellSize = 40 } = props ?? {};

        this.cellSize = cellSize;
        this.pathFinder = new PathFinder();
        this.cellsContainer = new Container();
        this.cellsTree = new BoardCellsTree(
            cell => this.cellsContainer.addChild(cell.renderable),
            cell => this.cellsContainer.removeChild(cell.renderable)
        );
    }

    public get renderable() {
        return this.cellsContainer;
    }

    public get collider() {
        return this.cellsTree;
    }

    public getCellAt(col: number, row: number): BoardCell {
        return this.cellsTree.getCellAt(col, row);
    }

    public addCell(col: number, row: number): BoardCell {
        const cell = new BoardCell(col, row, this.cellSize, this);
        this.cellsTree.addCell(cell);

        return cell;
    }

    public alignWithCell(col: number, row: number, object: Sprite) {
        const x0 = col * this.cellSize;
        const y0 = row * this.cellSize;

        const w = object.width;
        const h = object.height;

        object.x = x0 + (this.cellSize - w) / 2;
        object.y = y0 + (this.cellSize - h) / 2;
    }

}