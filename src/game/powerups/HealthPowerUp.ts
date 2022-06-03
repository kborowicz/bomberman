import heartImg from '@/game/assets/heart.png';
import { Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import GameContext from '../GameContext';
import { loadTexture } from '../loader/AssetsLoader';
import PowerUpBlock from './PowerUpBlock';

export default class HealthPowerUp extends PowerUpBlock {

    public constructor(context: GameContext) {
        super(context);
        this.setFrameRenderable(Sprite.from(loadTexture(heartImg)));
    }

    public onCollect(actor: Actor, cell: BoardCell): void {
        this.playCollectSound();
        actor.health += 40;
        cell.setAsDefault();
    }

}