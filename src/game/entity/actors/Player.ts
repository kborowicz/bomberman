import GameContext from '@/game/GameContext';
import { Sprite } from 'pixi.js';
import Resources from '../../Resources';
import Actor from './Actor';

export default class Player extends Actor {

    private _sprite: Sprite;

    public constructor(context: GameContext) {
        super(context);
        this._sprite = Sprite.from(Resources.WOOD_TEXTURE);
        this._sprite.width = this.context.cellSize;
        this._sprite.height = this.context.cellSize;
    }

    public get speed(): number {
        return 4;
    }

    public get renderable() {
        return this._sprite;
    }

}