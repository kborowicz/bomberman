import shieldImg from '@/game/assets/shield.png';
import { Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import GameContext from '../GameContext';
import { loadTexture } from '../loader/AssetsLoader';
import sleep from '../utils/sleep';
import PowerUpBlock from './PowerUpBlock';

export default class ShieldPowerUp extends PowerUpBlock {

    public constructor(context: GameContext) {
        super(context);
        this.setFrameRenderable(Sprite.from(loadTexture(shieldImg)));
    }

    public onCollect(actor: Actor, cell: BoardCell): void {
        if (actor.hasShield) {
            return;
        }

        this.playCollectSound();
        cell.setAsDefault();

        actor.hasShield = true;
        sleep(3500, 7000).then(() => actor.hasShield = false);
    }

}