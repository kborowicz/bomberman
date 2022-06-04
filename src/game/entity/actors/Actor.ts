import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import PowerUpBlock from '@/game/powerups/PowerUpBlock';
import ShieldSprite from '@/game/sprite/ShieldSprite';
import TombstoneSprite from '@/game/sprite/TombstoneSprite';
import sleep from '@/game/utils/sleep';
import Dynamite from '@/game/weapons/Dynamite';
import HealthBar from '../../sprite/HealthBar';
import Entity, { EntityEventMap } from '../Entity';
import WeaponStack from './WeaponStack';

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

    private static actorCounter = 0;

    protected readonly _id: string;
    protected currentCell: BoardCell;
    protected healthBar: HealthBar;
    protected shieldSprite: ShieldSprite;

    protected _speed = 4;
    protected _maxHealth = 150;
    protected _health = this._maxHealth;
    protected _isMoving = false;
    protected _hasShield = false;

    protected _weaponStack: WeaponStack;

    public constructor(context: GameContext) {
        super(context);
        this.healthBar = new HealthBar(context.cellSize);
        this.shieldSprite = new ShieldSprite(context.cellSize);

        this.shieldSprite.visible = false;
        this.shieldSprite.zIndex = 1;
        this.healthBar.renderable.zIndex = 2;

        this.container.addChild(this.healthBar.renderable);
        this.container.addChild(this.shieldSprite);

        this._id = 'actor_' + Actor.actorCounter;
        Actor.actorCounter++;

        this._weaponStack = new WeaponStack(() => new Dynamite(context));

        this.on('healthchange', health => {
            this.healthBar.setHealth(health, this.maxHealth);
        });

        this.on('die', () => {
            if (!context.player.isAlive) {
                context.playerLose();
            } else {
                if (context.enemies.every(e => !e.isAlive)) {
                    context.playerWin();
                }
            }

            this.container.removeChildren();
            this.container.addChild(new TombstoneSprite(context.cellSize));
        });
    }

    public get id(): string {
        return this._id;
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
        const prevHealth = this._health;
        const newHealth = Math.min(Math.max(value, 0), this.maxHealth);

        if (prevHealth != newHealth) {
            if (this._hasShield && newHealth < prevHealth) {
                return;
            }

            this._health = newHealth;
            this.emitter.emit('healthchange', this._health);

            if (this._health == 0) {
                this.emitter.emit('die');
            }
        }
    }

    public get isMoving() {
        return this._isMoving;
    }

    public get isAlive() {
        return this._health > 0;
    }

    public get weaponStack() {
        return this._weaponStack;
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
        return this._maxHealth;
    }

    public get hasShield() {
        return this._hasShield;
    }

    public set hasShield(value: boolean) {
        this._hasShield = value;
        this.shieldSprite.visible = value;
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
        this.emitter.emit('spawn', this.nearestCell);
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
        let collision = false;

        if (this.nearestCell != this.currentCell) {
            this.emitter.emit('cellchange', this.nearestCell, this.currentCell);
            this.currentCell = this.nearestCell;

            if (this.currentCell.block instanceof PowerUpBlock) {
                this.currentCell.block.onCollect(this, this.currentCell);
            }
        }

        if (dx != 0) {
            const shiftedBbox = bbox.shiftX(dx);

            if (board.testCollision(shiftedBbox)) {
                collision = true;
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
                collision = true;
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
            this.renderable.x += dx;
            this.renderable.y += dy;

            this._isMoving = true;
            this.emitter.emit('move', dx, dy);
        } else {
            this._isMoving = false;
            this.emitter.emit('idle');
        }

        return collision;
    }

}