import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import Bomb from '@/game/weapons/Bomb';
import { Container, Sprite } from 'pixi.js';
import Resources from '../../../Resources';
import Actor from '../Actor';
import ActorSprite from '../ActorSprite';
import Enemy from './Enemy';

export default class PlayerEnemy extends Enemy {

    private _sprite: ActorSprite;
    private prevTargetCell: BoardCell;

    public constructor(context: GameContext) {
        super(context);
        this._sprite = new ActorSprite(Resources.CHARACTER_1);
        this._sprite.width = this.context.cellSize;
        this._sprite.height = this.context.cellSize;

        this.on('spawn', () => {
            this.tryToKillActor(this.context.player);

            setInterval(() => {
                this.tryToKillActor(this.context.player);
            }, 2500);
        });

        this.on('move', (dx, dy) => {
            this._sprite.setDirection(dx, dy);
            this._sprite.play();
        });

        this.on('idle', () => this._sprite.stop());
    }

    public get renderable(): Container {
        return this._sprite;
    }

    private tryToKillActor(actor: Actor) {
        // if (actor.nearestCell != this.prevTargetCell) {
        const movement = this.goTo(actor.nearestCell);
        movement.on('finish', () => {
            const bomb = new Bomb(this.context);
            bomb.spawnAt(this.nearestCell, this);
        });

        this.prevTargetCell = actor.nearestCell;
        // }
    }

}