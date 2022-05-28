import { Container, Sprite } from 'pixi.js';
import BoundingBox from '../collision/BoundingBox';
import { CollisionTest } from '../collision/CollisionTest';
import { Renderable } from '../Renderable';
import { BoardCell } from './BoardCell';
import BoardCellsTree from './BoardCellsTree';
import PathFinder from './PathFinder';

export interface IBoardProps {
    cellSize?: number
}

export default class Board implements Renderable, CollisionTest {

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

    public testCollision(bbox: BoundingBox): boolean {
        return this.cellsTree.testCollision(bbox);
    }

    public getCellAt(col: number, row: number): BoardCell {
        return this.cellsTree.getCellAt(col, row);
    }

    public addCell(col: number, row: number): BoardCell {
        const cell = new BoardCell(col, row, this.cellSize, this);
        this.cellsTree.addCell(cell);

        return cell;
    }

    public getShortestPath(c0: BoardCell, c1: BoardCell) {
        return this.pathFinder.find(c0, c1);
    }

}