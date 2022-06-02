import { Container } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import PowerUpBlock from './PowerUpBlock';

export default class HealthPowerUp extends PowerUpBlock {

    public onCollect(actor: Actor, cell: BoardCell): void {
        this.playCollectSound();
        actor.health += 20;
        cell.setAsDefault();
    }

    protected getFrameRenderable(): Container {
        return new Container();
    }

}