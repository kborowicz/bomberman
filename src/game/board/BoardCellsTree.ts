import RBush from 'rbush';
import BoundingBox from '../collision/BoundingBox';
import { ICollisionTest } from '../collision/ICollisionTest';
import { BoardCell } from './BoardCell';

type OnCellAddListener = (cell: BoardCell) => void;
type OnCellRemoveListener = (cell: BoardCell) => void;

export default class BoardCellsTree implements ICollisionTest {

    private cellsTree: Tree = new Tree();
    private cellsMap: Map<string, BoardCell> = new Map();
    private onCellAddListener: OnCellAddListener;
    private onCellRemoveListener: OnCellRemoveListener;

    public constructor(
        onAddListener: OnCellAddListener,
        onRemoveListener: OnCellRemoveListener
    ) {
        this.onCellAddListener = onAddListener;
        this.onCellRemoveListener = onRemoveListener;
    }

    public testCollision(bbox: BoundingBox): boolean {
        return !!this.findIntersection(bbox).find(cell => {
            if (cell.isWall) {
                const [f1, f2] = bbox.getIntersection(cell.bbox);
                return (f1 > 0.01 && f2 > 0.01);
            } else {
                return false;
            }
        });
    }

    public findIntersection(bbox: BoundingBox): BoardCell[] {
        const { x0, y0, x1, y1 } = bbox;

        return this.cellsTree.search({
            minX: x0, minY: y0,
            maxX: x1, maxY: y1
        });
    }

    public getCellAt(col: number, row: number) {
        return this.cellsMap.get(this.getMapKey(col, row));
    }

    public addCell(cell: BoardCell) {
        const { row, col } = cell;
        const key = this.getMapKey(col, row);

        if (this.cellsMap.has(key)) {
            const oldCell = this.cellsMap.get(key);
            this.cellsTree.remove(oldCell);
            this.onCellRemoveListener(oldCell);
        }

        this.cellsMap.set(key, cell);
        this.cellsTree.insert(cell);
        this.onCellAddListener(cell);
    }

    public getNonWallCells() {
        return [...this.cellsMap.values()].filter(cell => !cell.isWall);
    }

    public getRandomNonWallCell() {
        const nonWallCells = this.getNonWallCells();
        return nonWallCells[Math.floor(Math.random() * nonWallCells.length)];
    }

    private getMapKey(col: number, row: number) {
        return col + '#' + row;
    }

}

class Tree extends RBush<BoardCell> {

    public toBBox(cell: BoardCell) {
        const { x0, y0, x1, y1 } = cell.bbox;

        return { minX: x0, minY: y0, maxX: x1, maxY: y1 };
    }

    public compareMinX(a: BoardCell, b: BoardCell): number {
        return a.bbox.p1.x - b.bbox.p1.x;
    }

    public compareMinY(a: BoardCell, b: BoardCell): number {
        return a.bbox.p2.x - b.bbox.p2.x;
    }

}