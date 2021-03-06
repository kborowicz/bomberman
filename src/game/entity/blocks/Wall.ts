import Resources from '@/game/Resources';
import { Container, Sprite } from 'pixi.js';
import Block from './Block';

export default class Wall extends Block {

    private sprite = Sprite.from(Resources.WALL_TEXTURE);

    public get isWall(): boolean {
        return true;
    }

    public get isDestroyable(): boolean {
        return false;
    }

    public get renderable(): Container {
        return this.sprite;
    }

}