import { BoardCell } from './board/BoardCell';
import Heap from 'heap';

export default class AStar {

    public static run(c0: BoardCell, c1: BoardCell): BoardCell[] {
        const heap = new Heap<Node>((a, b) => a.fscore - b.fscore);
        const nodes = new Map<string, Node>();

        const startNode = new Node(c0);
        startNode.gscore = 0;
        startNode.fscore = 0;
        startNode.opened = true;

        heap.push(startNode);
        // nodes.set(startNode.cell.hash);

        while (!heap.empty()) {
            const currentNode = heap.pop();
            currentNode.closed = true;

            if (currentNode.cell == c1) {
                return currentNode.backtrace().map(node => node.cell);
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

    private static heuristic(c0: BoardCell, c1: BoardCell) {
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

        return backtrace;
    }

}