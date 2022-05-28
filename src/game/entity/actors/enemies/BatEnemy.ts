import { Container, Sprite } from 'pixi.js';
import Resources from '../../../Resources';
import Enemy from './Enemy';

export default class BatEnemy extends Enemy {

    private _sprite = Sprite.from(Resources.WOOD_TEXTURE);

    public get renderable(): Container {
        return this._sprite;
    }

}