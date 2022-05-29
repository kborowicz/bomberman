import { Path } from '@/game/board/PathFinder';
import { IEventEmitter } from '@/game/IEventEmitter';
import EventEmitter from 'eventemitter3';
import { BoardCell } from '../../../board/BoardCell';
import BoundingBox from '../../../collision/BoundingBox';
import Actor from '../Actor';

export interface MovementEventMap {
    'change': (dx: number, dy: number) => void;
    'cancel': () => void;
    'finish': () => void;
}

export default class Movement implements IEventEmitter<MovementEventMap> {

    private static readonly epsilon = 0.001;

    private readonly emmiter: EventEmitter;
    public readonly actor: Actor;
    public readonly dest: BoardCell;

    private readonly path: Path;
    private tickerCallback: (dt: number) => void;
    private _isRunning = false;
    private _isPaused = false;

    public constructor(actor: Actor, src: BoardCell, dest: BoardCell) {
        this.emmiter = new EventEmitter();
        this.actor = actor;
        this.dest = dest;

        const board = actor.context.board;
        this.path = board.pathFinder.find(this.actor.nearestCell, this.dest);
    }

    public get isPossible() {
        return this.path != null;
    }

    public on<K extends keyof MovementEventMap>(event: K, fn: MovementEventMap[K]): void {
        this.emmiter.on(event + '', fn);
    }

    public off<K extends keyof MovementEventMap>(event: K, fn: MovementEventMap[K]): void {
        this.emmiter.off(event + '', fn);
    }

    public start() {
        if (this._isRunning || !this.isPossible) {
            return;
        }

        const { board, ticker } = this.actor.context;
        const pathPoints = [...this.path.points];
        
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

            if (dx == 0 && dy == 0) {
                this.actor.nearestCell.alignObject(this.actor.renderable);
                const nextCell = pathPoints.shift();

                if (nextCell) {
                    movement = this.getMovementData(
                        this.actor.nearestCell.bbox,
                        nextCell.bbox
                    );
                } else {
                    this.finish();
                }
            } else {
                this.actor.move(dx, dy);
                this.emmiter.emit('change', dx, dy);
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
        this.emmiter.emit('cancel');
    }

    private finish() {
        this.actor.context.ticker.remove(this.tickerCallback);
        this.emmiter.emit('finish');
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