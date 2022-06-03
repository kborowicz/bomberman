import { Container } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import GameContext from '../GameContext';
import Weapon from '../weapons/Weapon';
import PowerUpBlock from './PowerUpBlock';

export default class WeaponPowerUp extends PowerUpBlock {

    private readonly weapon: Weapon;

    public constructor(context: GameContext, weapon: Weapon) {
        super(context);
        this.weapon = weapon;

        this.setFrameRenderable(this.weapon.getRenderable());
    }

    public onCollect(actor: Actor, cell: BoardCell): void {
        this.playCollectSound();
        cell.setAsDefault();
        actor.weaponStack.push(this.weapon);
    }

}