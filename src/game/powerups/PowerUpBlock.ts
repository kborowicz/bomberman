import { Container } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import Block from '../entity/blocks/Block';
import GameContext from '../GameContext';
import PowerUpFrameSprite from '../sprite/PowerUpFrame';
import powerUpSoundSrc from '@/game/assets/sounds/powerup.mp3';
import { Howl } from 'howler';

export default abstract class PowerUpBlock extends Block {

    protected readonly sprite: PowerUpFrameSprite;

    public constructor(context: GameContext) {
        super(context);
        this.sprite = new PowerUpFrameSprite(context.cellSize);
        this.sprite.addAndFill(this.getFrameRenderable());
    }

    public get isWall(): boolean {
        return false;
    }

    public get isDestroyable(): boolean {
        return false;
    }

    public get renderable() {
        return this.sprite;
    }

    public abstract onCollect(actor: Actor, cell: BoardCell): void;

    protected playCollectSound() {
        new Howl({
            src: [powerUpSoundSrc],
            volume: 0.2,
            autoplay: true
        });
    }

    protected abstract getFrameRenderable(): Container;

}