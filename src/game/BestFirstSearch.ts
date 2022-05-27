import Board from './board/Board';
import { BoardCell } from './board/BoardCell';
import PriorityQueue from './PriorityQueue';

export default class BreadFirstSearch {

    public static run(board: Board, src: BoardCell, dest: BoardCell) {
        const priorityQueue = new PriorityQueue<INode>((a, b) => a.cost - b.cost);
        const visitedNodes = new Set<string>();

        const firstNode: INode = { cell: src, cost: 0 };
        priorityQueue.push(firstNode);

        const shortestPath: BoardCell[] = [];

        while (!priorityQueue.isEmpty()) {
            const node = priorityQueue.pop();
            shortestPath.push(node.cell);

            if (node.cell == dest) {
                return shortestPath;
            }

            visitedNodes.add(this.getCellHash(node.cell));

            const n = node.cell.nCell;
            const e = node.cell.eCell;
            const s = node.cell.sCell;
            const w = node.cell.wCell;

            if (n && !visitedNodes.has(n.hash) && !n.isWall) {
                priorityQueue.push({ cell: n, cost: node.cost + 1 });
            }

            if (e && !visitedNodes.has(e.hash) && !e.isWall) {
                priorityQueue.push({ cell: e, cost: node.cost + 1 });
            }

            if (s && !visitedNodes.has(s.hash) && !s.isWall) {
                priorityQueue.push({ cell: s, cost: node.cost + 1 });
            }

            if (w && !visitedNodes.has(w.hash) && !w.isWall) {
                priorityQueue.push({ cell: w, cost: node.cost + 1 });
            }

            const nw = node.cell.nwCell;
            const sw = node.cell.swCell;
            const se = node.cell.seCell;
            const ne = node.cell.neCell;

            // if (nw && !visitedNodes.has(nw.hash) && node.cell.nwMove) {
            //     priorityQueue.push({ cell: nw, cost: node.cost + 1 });
            // }

            // if (sw && !visitedNodes.has(sw.hash) && node.cell.swMove) {
            //     priorityQueue.push({ cell: sw, cost: node.cost + 1 });
            // }

            // if (se && !visitedNodes.has(se.hash) && node.cell.seMove) {
            //     priorityQueue.push({ cell: se, cost: node.cost + 1 });
            // }

            // if (ne && !visitedNodes.has(ne.hash) && node.cell.neMove) {
            //     priorityQueue.push({ cell: ne, cost: node.cost + 1 });
            // }
        }
    }

    private static getCellHash(cell: BoardCell): string {
        return cell.col + '#' + cell.row;
    }

}

export interface INode {
    cell: BoardCell;
    cost: number;
}