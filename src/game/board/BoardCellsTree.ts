import { Collider } from '../collision/Collider';
import RBush from 'rbush';
import { BoardCell } from './BoardCell';
import Rectangle from '../collision/shapes/Rectangle';
import BoxCollider from '../collision/colliders/BoxCollider';

type OnCellAddListener = (cell: BoardCell) => void;
type OnCellRemoveListener = (cell: BoardCell) => void;

export default class BoardCellsTree implements Collider {

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

    public testCollision(other: Collider): boolean {
        if (other instanceof BoxCollider) {
            return !!this.findIntersection(other.box).find(cell => {
                if (cell.isWall) {
                    const f1 = other.box.intersectionFactorX(cell.collider.box);
                    const f2 = other.box.intersectionFactorY(cell.collider.box);

                    console.log(f1, f2);

                    return (f1 > 0.01 && f2 > 0.01);
                } else {
                    return false;
                }
                return cell.isWall;
            });
        }

        return false;
    }

    public findIntersection(queryRect: Rectangle): BoardCell[] {
        const { x0, y0, x1, y1 } = queryRect;

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

    private getMapKey(col: number, row: number) {
        return col + '#' + row;
    }

}

class Tree extends RBush<BoardCell> {

    public toBBox(cell: BoardCell) {
        const { x0, y0, x1, y1 } = cell.collider.box;

        return { minX: x0, minY: y0, maxX: x1, maxY: y1 };
    }

    public compareMinX(a: BoardCell, b: BoardCell): number {
        return a.collider.box.p1.x - b.collider.box.p1.x;
    }

    public compareMinY(a: BoardCell, b: BoardCell): number {
        return a.collider.box.p2.x - b.collider.box.p2.x;
    }

}