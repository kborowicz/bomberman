import Resources from '@/game/Resources';
import { Container, Sprite } from 'pixi.js';
import Block from './Block';

export default class Bricks extends Block {

    private sprite = Sprite.from(Resources.BRICK_TEXTURE);

    public get isWall(): boolean {
        return true;
    }

    public get isDestroyable(): boolean {
        return true;
    }

    public get renderable(): Container {
        return this.sprite;
    }

}