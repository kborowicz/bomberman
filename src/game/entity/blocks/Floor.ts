import Resources from '@/game/Resources';
import { Container, Sprite } from 'pixi.js';
import Block from './Block';

export default class Floor extends Block {

    protected sprite: Container = Sprite.from(Resources.GRASS_TEXTURE);

    public get isWall(): boolean {
        return false;
    }

    public get isDestroyable(): boolean {
        return false;
    }

    public get renderable(): Container {
        return this.sprite;
    }

}
