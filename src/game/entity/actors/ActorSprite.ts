import { AnimatedSprite, Spritesheet } from 'pixi.js';

export type Direction = 'up' | 'down' | 'left' | 'right';

export default class CharacterSprite extends AnimatedSprite {

    protected spritesheet: Spritesheet;

    public constructor(spritesheet: Spritesheet) {
        super(spritesheet.animations['down']);

        this.spritesheet = spritesheet;
        this.animationSpeed = 0.1;
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
    
    private setAnimation(direction: Direction) {
        const newAnimation = this.spritesheet.animations[direction];

        if (this.textures != newAnimation) {
            this.textures = newAnimation;
        }
    }

}