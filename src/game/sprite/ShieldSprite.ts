import { Sprite } from 'pixi.js';
import Resources from '../Resources';
import CellSprite from './CellSprite';

export default class ShieldSprite extends CellSprite {

    public constructor(cellSize: number) {
        super(cellSize);
        this.addAndFill(Sprite.from(Resources.SHIELD_TEXTURE));
    }

}