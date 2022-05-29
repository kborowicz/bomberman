import { IRenderable } from '@/game/IRenderable';
import { DisplayObject, Graphics } from 'pixi.js';

export default class HealthBar implements IRenderable {

    private readonly outerBar = new Graphics();
    private readonly cellSize: number;

    public constructor(cellSize: number) {
        this.cellSize = cellSize;

        //FIXME Czemu te transformacje tak dziwnie działają (po dodanie do containera jest dziwna skala w dół)
        this.outerBar.y = 4;
        this.outerBar.x = 8;

        this.setPerc(1);
    }

    public get renderable() {
        return this.outerBar;
    }

    public setPerc(per: number) {
        this.outerBar.beginFill(0x000000);
        this.outerBar.drawRect(0, 0, this.cellSize, 5);

        this.outerBar.beginFill(0x00FF00);
        this.outerBar.drawRect(0, 0, per * this.cellSize, 5);
    }

}