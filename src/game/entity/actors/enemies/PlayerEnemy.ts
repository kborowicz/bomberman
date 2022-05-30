import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import Bomb from '@/game/weapons/Bomb';
import { Container, Sprite } from 'pixi.js';
import Resources from '../../../Resources';
import Actor from '../Actor';
import ActorSprite from '../ActorSprite';
import Enemy from './Enemy';

export default class PlayerEnemy extends Enemy {

    protected sprite: ActorSprite;
    private prevTargetCell: BoardCell;

    public constructor(context: GameContext) {
        super(context);
        this.sprite = new ActorSprite(Resources.CHARACTER_1);
        this.sprite.width = this.context.cellSize;
        this.sprite.height = this.context.cellSize;
        this.container.addChild(this.sprite);

        this.on('spawn', () => {
            this.tryToKillActor(this.context.player);

            setInterval(() => {
                this.tryToKillActor(this.context.player);
            }, 2500);
        });

        this.on('move', (dx, dy) => {
            this.sprite.setDirection(dx, dy);
            this.sprite.play();
        });

        this.on('idle', () => this.sprite.stop());
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