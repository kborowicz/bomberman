import { Container } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import Player from '../entity/actors/Player';
import PowerUpBlock from './PowerUpBlock';

export default class WeaponPowerUp extends PowerUpBlock {

    public onCollect(actor: Actor, cell: BoardCell): void {
        if (!(actor instanceof Player)) {
            return;
        }

        this.playCollectSound();
    }

    protected getFrameRenderable(): Container {
        return new Container();
    }

}