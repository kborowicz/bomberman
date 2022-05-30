import { AnimatedSprite, Spritesheet } from 'pixi.js';
import CellSprite from './CellSprite';

export type Direction = 'up' | 'down' | 'left' | 'right';

export default class CharacterSprite extends CellSprite {

    protected spritesheet: Spritesheet;
    protected sprite: AnimatedSprite;

    public constructor(cellSize: number, spritesheet: Spritesheet) {
        super(cellSize);

        this.spritesheet = spritesheet;
        this.sprite = new AnimatedSprite(spritesheet.animations['down']);
        this.sprite.animationSpeed = 0.1;

        this.addAndFill(this.sprite);
    }

    public setDirection(dx: number, dy: number) {
        if (dx > 0) {
            this.direction = 'right';
        } else if (dx < 0) {
            this.direction = 'left';
        }

        if (dy > 0) {
            this.direction = 'down';
        } else if (dy < 0) {
            this.direction = 'up';
        }
    }

    public set direction(direction: Direction) {
        switch (direction) {
            case 'up': this.setAnimation('up'); break;
            case 'down': this.setAnimation('down'); break;
            case 'left': this.setAnimation('left'); break;
            case 'right': this.setAnimation('right'); break;
        }
    }

    public play() {
        this.sprite.play();
    }

    public stop() {
        this.sprite.stop();
    }

    private setAnimation(direction: Direction) {
        const newAnimation = this.spritesheet.animations[direction];

        if (this.sprite.textures != newAnimation) {
            this.sprite.textures = newAnimation;
        }
    }

}