import { BoardCell } from '../board/BoardCell';
import BoundingBox from '../collision/BoundingBox';
import Actor from './Actor';

export default class Movement {

    public readonly actor: Actor;
    public readonly dest: BoardCell;

    private tickerCallback: (dt: number) => void;
    private _isRunning = false;
    private _isPaused = false;

    public constructor(actor: Actor, dest: BoardCell, autostart = true) {
        this.actor = actor;
        this.dest = dest;

        if (autostart) {
            this.start();
        }
    }

    public start() {
        if (this._isRunning) {
            return;
        }

        const { board, ticker } = this.actor.context;
        const shortestPath = board.getShortestPath(this.actor.nearestCell, this.dest);
        const pathPoints = [...shortestPath.points];

        if (!pathPoints.length) {
            return null;
        }

        let movement: IMovementData = this.getMovementData(
            this.actor.nearestCell.bbox,
            pathPoints.shift().bbox
        );

        this.tickerCallback = (dt: number) => {
            if (this._isPaused) {
                return;
            }

            const { cx, cy } = this.actor.bbox;
            const { x1, y1, dirx, diry, cosa, sina } = movement;

            let dx: number;
            let dy: number;

            if (this.equals(cx, x1)) {
                dx = 0;
            } else {
                dx = dt * this.actor.speed * cosa;

                if (cx * dirx + dx * dirx >= x1 * dirx) {
                    dx = x1 - cx;
                }
            }

            if (this.equals(cy, y1)) {
                dy = 0;
            } else {
                dy = dt * this.actor.speed * sina;

                if (cy * diry + dy * diry >= y1 * diry) {
                    dy = y1 - cy;
                }
            }

            if (this.equals(dx, 0) && this.equals(dy, 0)) {
                const nextCell = pathPoints.shift();

                if (nextCell) {
                    movement = this.getMovementData(
                        this.actor.nearestCell.bbox,
                        nextCell.bbox
                    );
                } else {
                    this.cancel();
                }
            } else {
                this.actor.move(dx, dy);
            }

        };

        ticker.add(this.tickerCallback);
        this._isRunning = true;
    }

    public pause() {
        this._isPaused = true;
    }

    public resume() {
        this._isPaused = false;
    }

    public cancel() {
        this.actor.context.ticker.remove(this.tickerCallback);
    }

    private getMovementData(src: BoundingBox, dst: BoundingBox): IMovementData {
        const dx = dst.cx - src.cx;
        const dy = dst.cy - src.cy;
        const a = Math.atan2(dy, dx);

        return {
            dx, dy, a,
            x0: src.cx,
            y0: src.cy,
            x1: dst.cx,
            y1: dst.cy,
            cosa: Math.cos(a),
            sina: Math.sin(a),
            dirx: Math.sign(dx),
            diry: Math.sign(dy)
        };
    }

    private equals(a: number, b: number, eps = 0.001) {
        return Math.abs(a - b) <= eps;
    }

}

interface IMovementData {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    dx: number;
    dy: number;
    a: number;
    cosa: number;
    sina: number;
    dirx: number;
    diry: number;
}