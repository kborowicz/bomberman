import { Container, Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import sleep from '../utils/sleep';
import PowerUpBlock from './PowerUpBlock';
import bootsImg from '@/game/assets/boots.png';
import { loadTexture } from '../loader/AssetsLoader';
import GameContext from '../GameContext';

export default class SpeedPowerUp extends PowerUpBlock {

    public constructor(context: GameContext) {
        super(context);
        this.setFrameRenderable(Sprite.from(loadTexture(bootsImg)));
    }

    public onCollect(actor: Actor, cell: BoardCell): void {
        this.playCollectSound();
        actor.speed += 1;
        cell.setAsDefault();

        sleep(10000).then(() => {
            if (!actor.context.isDestroyed) {
                actor.speed -= 1;
            }
        });
    }

}