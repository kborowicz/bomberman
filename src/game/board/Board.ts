import { Container } from 'pixi.js';
import BoundingBox from '../collision/BoundingBox';
import { ICollisionTest } from '../collision/ICollisionTest';
import Block from '../entity/blocks/Block';
import GameContext from '../GameContext';
import { IRenderable } from '../IRenderable';
import { BoardCell } from './BoardCell';
import BoardCellsTree from './BoardCellsTree';
import PathFinder from './PathFinder';

export interface IBoardProps {
    cellSize?: number
}

export default class Board implements IRenderable, ICollisionTest {

    private readonly container: Container;
    private readonly cells: BoardCellsTree;

    public readonly context: GameContext;
    public readonly pathFinder: PathFinder;
    public readonly cellSize = 42;

    public constructor(context: GameContext) {
        this.context = context;
        this.pathFinder = new PathFinder();
        this.container = new Container();
        this.cells = new BoardCellsTree(
            cell => this.container.addChild(cell.renderable),
            cell => this.container.removeChild(cell.renderable)
        );
    }

    public get renderable() {
        return this.container;
    }

    public testCollision(bbox: BoundingBox): boolean {
        return this.cells.testCollision(bbox);
    }

    public getCellAt(col: number, row: number): BoardCell {
        return this.cells.getCellAt(col, row);
    }

    public addCell(col: number, row: number, block: Block): BoardCell {
        const cell = new BoardCell(col, row, block, this);
        cell.block.renderable.x = col * this.cellSize;
        cell.block.renderable.y = row * this.cellSize;
        cell.block.renderable.width = this.cellSize;
        cell.block.renderable.height = this.cellSize;

        this.container.addChild(cell.block.renderable);
        this.cells.addCell(cell);

        return cell;
    }

    public getNonWallCells() {
        return this.cells.getNonWallCells();
    }

    public getRandomNonWallCell(): BoardCell {
        return this.cells.getRandomNonWallCell();
    }

}