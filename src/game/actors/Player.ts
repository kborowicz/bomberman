import { AnimatedSprite, Sprite } from 'pixi.js';
import GameContext from '../GameContext';
import Resources from '../Resources';
import Actor from './Actor';

export default class Player extends Actor {

    private _sprite: Sprite;

    public constructor(context: GameContext) {
        super(context);
        
        this._sprite = Sprite.from(Resources.WOOD_TEXTURE);
        this._sprite.width = context.cellSize;
        this._sprite.height = context.cellSize;
    }

    public get speed(): number {
        return 4;
    }

    protected get sprite(): Sprite {
        return this._sprite;
    }

}