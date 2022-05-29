import { BoardCell } from '../../../board/BoardCell';
import BoundingBox from '../../../collision/BoundingBox';
import Actor from '../Actor';

export default class Movement {

    private static readonly epsilon = 0.001;

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
            this.actor.bbox,
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

            dx = dt * this.actor.speed * cosa;
            dy = dt * this.actor.speed * sina;

            if (Math.abs(dx) > Math.abs(x1 - cx)) {
                dx = Math.abs(x1 - cx) * dirx;
            }

            if (Math.abs(dy) > Math.abs(y1 - cy)) {
                dy = Math.abs(y1 - cy) * diry;
            }

            if (Math.abs(dx) <= Movement.epsilon) {
                dx = 0;
            }

            if (Math.abs(dy) <= Movement.epsilon) {
                dy = 0;
            }

            // console.log(dx, dy)

            if (dx == 0 && dy == 0) {
                this.actor.nearestCell.alignObject(this.actor.renderable);
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
                console.log(movement)
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
            cosa: Math.round(Math.cos(a)),
            sina: Math.round(Math.sin(a)),
            dirx: Math.sign(dx),
            diry: Math.sign(dy)
        };
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