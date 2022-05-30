import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import { Container } from 'pixi.js';
import Entity, { EntityEventMap } from '../Entity';
import HealthBar from './HealtBar';

export interface ActorEventMap extends EntityEventMap {
    'cellchange': (curr: BoardCell, prev: BoardCell) => void;
    'die': () => void;
    'spawn': (cell: BoardCell) => void;
    'move': (dx: number, dy: number) => void;
    'idle': () => void;
    'healthchange': (health: number) => void;
}

export default abstract class Actor<
    E extends ActorEventMap = ActorEventMap
    > extends Entity<E> {

    protected currentCell: BoardCell;
    protected healthBar: HealthBar;

    protected _speed = 4;
    protected _health = this.maxHealth;

    public constructor(context: GameContext) {
        super(context);
        this.healthBar = new HealthBar(context.cellSize);
        this.container.addChild(this.healthBar.renderable);

        this.on('healthchange', health => {
            this.healthBar.setHealth(health, this.maxHealth);
        });
    }

    public get speed(): number {
        return this._speed;
    }

    public set speed(value: number) {
        this._speed = Math.max(value, 0);
    }

    public get health(): number {
        return this._health;
    }

    public set health(value: number) {
        this._health = Math.max(value, 0);

        this.emmiter.emit('healthchange', this._health);

        if (this._health == 0) {
            this.emmiter.emit('die');
        }
    }

    public get isAlive() {
        return this._health > 0;
    }

    public get nearestCell() {
        const board = this.context.board;
        const cellSize = board.cellSize;
        const { cx, cy } = this.bbox; //TODO jak to ogarnac zeby dzialalo poruszanie

        return board.getCellAt(
            Math.floor(cx / cellSize),
            Math.floor(cy / cellSize)
        );
    }

    public get maxHealth() {
        return 150;
    }

    public instantKill() {
        this.health = 0;
    }

    public spawnAt(col: number, row: number): void;
    public spawnAt(cell: BoardCell): void;
    public spawnAt(arg1: number | BoardCell, arg2?: number) {
        if (typeof arg1 === 'number') {
            this.moveToCell(arg1, arg2);
        } else {
            this.moveToCell(arg1);
        }

        this.context.addObject(this);
        this.emmiter.emit('spawn', this.nearestCell);
    }

    public moveToCell(col: number, row: number): void;
    public moveToCell(cell: BoardCell): void;
    public moveToCell(arg1: number | BoardCell, arg2?: number): void {
        let cell: BoardCell;

        if (typeof arg1 === 'number') {
            cell = this.context.board.getCellAt(arg1, arg2);
        } else {
            cell = arg1;
        }

        if (!cell.isWall) {
            cell.alignObject(this.renderable);
        }
    }

    public move(dx: number, dy: number) {
        const board = this.context.board;
        const bbox = this.bbox;

        if (this.nearestCell != this.currentCell) {
            this.emmiter.emit('cellchange', this.nearestCell, this.currentCell);
            this.currentCell = this.nearestCell;
        }

        // TODO wspomaganie wejścia w wąskie korytarze

        if (dx != 0) {
            const shiftedBbox = bbox.shiftX(dx);

            if (board.testCollision(shiftedBbox)) {
                let x0: number;
                let x1: number;

                if (dx > 0) {
                    x0 = this.bbox.x1;
                    x1 = this.nearestCell.eCell.bbox.x0;
                } else {
                    x0 = this.bbox.x0;
                    x1 = this.nearestCell.wCell.bbox.x1;
                }

                dx = x1 - x0;
            }
        }

        if (dy != 0) {
            const shiftedBbox = bbox.shiftY(dy);

            if (board.testCollision(shiftedBbox)) {
                let y0: number;
                let y1: number;

                if (dy > 0) {
                    y0 = this.bbox.y1;
                    y1 = this.nearestCell.sCell.bbox.y0;
                } else {
                    y0 = this.bbox.y0;
                    y1 = this.nearestCell.nCell.bbox.y1;
                }

                dy = y1 - y0;
            }
        }

        if (dx != 0 || dy != 0) {
            this.emmiter.emit('move', dx, dy);
        } else {
            this.emmiter.emit('idle');
        }

        this.renderable.x += dx;
        this.renderable.y += dy;
    }

}