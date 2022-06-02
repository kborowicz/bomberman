import { Container } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import PowerUpBlock from './PowerUpBlock';

export default class SpeedPowerUp extends PowerUpBlock {

    public onCollect(actor: Actor, cell: BoardCell): void {
        this.playCollectSound();
        actor.speed += 1;
        cell.setAsDefault();
    }

    protected getFrameRenderable(): Container {
        return new Container();
    }

}