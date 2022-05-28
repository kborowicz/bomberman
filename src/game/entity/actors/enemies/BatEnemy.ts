import GameContext from '@/game/GameContext';
import { Container, Sprite } from 'pixi.js';
import Resources from '../../../Resources';
import Enemy from './Enemy';

export default class BatEnemy extends Enemy {

    private _sprite: Sprite;

    public constructor(context: GameContext) {
        super(context);
        this._sprite = Sprite.from(Resources.WOOD_TEXTURE);
        this._sprite.width = this.context.cellSize;
        this._sprite.height = this.context.cellSize;
    }

    public get renderable(): Container {
        return this._sprite;
    }

}