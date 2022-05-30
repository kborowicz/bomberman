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

        const scale = health / maxHealth;
        this.outerBar.beginFill(this.getBarColor(scale));
        this.outerBar.drawRect(0, 0, scale * this.size, 3);
    }

    private getBarColor(t: number) {
        const r = 255 * (1 - t);
        const g = 255 * t;
        const b = 0;

        return (r << 16) + (g << 8) + (b);
    }

}