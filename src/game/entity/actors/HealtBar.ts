import { IRenderable } from '@/game/IRenderable';
import { DisplayObject, Graphics } from 'pixi.js';

export default class HealthBar implements IRenderable {

    private readonly outerBar = new Graphics();
    private readonly size: number;

    public constructor(cellSize: number) {
        const paddingX = 4;
        const paddingY = 4;

        this.size = cellSize - 2 * paddingX;
        this.outerBar.y = paddingY;
        this.outerBar.x = paddingX;

        this.setHealth(1, 1);
    }

    public get renderable() {
        return this.outerBar;
    }

    public setHealth(health: number, maxHealth: number) {
        this.outerBar.beginFill(0x000000);
        this.outerBar.drawRect(0, 0, this.size, 3);

        this.outerBar.beginFill(0x00FF00);
        this.outerBar.drawRect(0, 0, health / maxHealth * this.size, 3);
    }

}