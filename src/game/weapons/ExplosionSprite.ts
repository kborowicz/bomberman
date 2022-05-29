import { AnimatedSprite } from 'pixi.js';
import Resources from '../Resources';

export default class ExplosionSprite extends AnimatedSprite {

    public constructor(cellSize: number) {
        super(Resources.EXPLOSION_SPRITESHEET.animations['explosion']);

        this.width = cellSize;
        this.height = cellSize;
        this.animationSpeed = 0.3;
        this.loop = false;

        this.play();
    }

}