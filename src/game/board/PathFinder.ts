
import Heap from 'heap';
import { BoardCell } from './BoardCell';

export default class PathFinder {

    public find(c0: BoardCell, c1: BoardCell): BoardPath {
        const heap = new Heap<Node>((a, b) => a.fscore - b.fscore);
        const nodes = new Map<string, Node>();

        const startNode = new Node(c0);
        startNode.gscore = 0;
        startNode.fscore = 0;
        startNode.opened = true;

        heap.push(startNode);
        nodes.set(startNode.cell.hash, startNode);

        while (!heap.empty()) {
            const currentNode = heap.pop();
            currentNode.closed = true;

            if (currentNode.cell == c1) {
                const backtrace = currentNode.backtrace();
                return new BoardPath(backtrace.map(node => node.cell));
            }

            currentNode.cell.neighbors.forEach(neighborCell => {
                const neighborNode = nodes.get(neighborCell.hash) ?? new Node(neighborCell);

                if (!nodes.has(neighborCell.hash)) {
                    nodes.set(neighborCell.hash, neighborNode);
                }

                if (neighborNode.closed || neighborCell.isWall) {
                    return;
                }

                const x1 = currentNode.cell.col;
                const y1 = currentNode.cell.row;

                const x2 = neighborCell.col;
                const y2 = neighborCell.row;

                // get the distance between current node and the neighbor
                // and calculate the next g score
                const cost = (x2 - x1 === 0 || y2 - y1 === 0) ? 1 : Math.SQRT2;
                const ngscore = currentNode.gscore + cost;

                if (!neighborNode.opened || ngscore < neighborNode.gscore) {
                    neighborNode.gscore = ngscore;
                    neighborNode.fscore = ngscore + this.heuristic(neighborCell, c1);
                    neighborNode.parent = currentNode;

                    if (!neighborNode.opened) {
                        heap.push(neighborNode);
                        neighborNode.opened = true;
                    } else {
                        heap.updateItem(neighborNode);
                    }
                }
            });
        }

        console.log('error');
    }

    private heuristic(c0: BoardCell, c1: BoardCell) {
        // Manhattan distance
        const d1 = Math.abs(c1.col - c0.col);
        const d2 = Math.abs(c1.row - c0.row);

        return (d1 + d2);
        return (c1.col - c0.col) ** 2 + (c1.row - c0.row) ** 2;
    }

}

class Node {

    public readonly cell: BoardCell;

    public parent: Node;

    public opened = false;
    public closed = false;

    public gscore: number;
    public fscore: number;

    public constructor(cell: BoardCell) {
        this.cell = cell;
    }

    public backtrace(): Node[] {
        const backtrace: Node[] = [this];
        let currentNode: Node = this.parent;

        while (currentNode) {
            backtrace.push(currentNode);
            currentNode = currentNode.parent;
        }

        return backtrace.reverse();
    }

}

export class BoardPath {

    public readonly cells: readonly BoardCell[];
    public readonly points: readonly BoardCell[];

    public constructor(cells: BoardCell[]) {
        this.cells = cells;
        this.points = this.getPoints(cells);
    }

    private getPoints(cells: BoardCell[]): BoardCell[] {
        const cellsCopy = [...cells];
        const points: BoardCell[] = [cellsCopy[0]];

        for (let i = 1; i < cellsCopy.length - 1; i++) {
            const prevCell = cellsCopy[i - 1];
            const currCell = cellsCopy[i + 0];
            const nextCell = cellsCopy[i + 1];

            // Find corners
            const dc1 = Math.abs(currCell.col - prevCell.col) == 1;
            const dr1 = Math.abs(currCell.row - prevCell.row) == 1;
            
            const dc2 = Math.abs(nextCell.col - currCell.col) == 1;
            const dr2 = Math.abs(nextCell.row - currCell.row) == 1;

            if (dc1 && dr2 || dc2 && dr1) {
                points.push(currCell);
            }
        }

        points.push(cellsCopy.pop());

        return points;
    }

}