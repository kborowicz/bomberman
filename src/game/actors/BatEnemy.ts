import { Sprite } from 'pixi.js';
import Resources from '../Resources';
import ActorAI from './ActorAI';

export default class BatEnemy extends ActorAI {

    private _sprite = Sprite.from(Resources.WOOD_TEXTURE);

    protected get sprite(): Sprite {
        return this._sprite;
    }

}