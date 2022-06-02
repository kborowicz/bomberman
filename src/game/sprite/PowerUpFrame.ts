import { Graphics } from 'pixi.js';
import CellSprite from './CellSprite';

export default class PowerUpFrameSprite extends CellSprite {

    private readonly frame = new Graphics();

    public constructor(cellSize: number) {
        super(cellSize);

        this.frame
            .beginFill(0x006FFF)
            .drawRect(0, 0, cellSize, cellSize)
            .beginFill(0x4C93F0)
            .drawRect(3, 3, cellSize - 6, cellSize - 6);

        this.addAndFill(this.frame);
    }

}