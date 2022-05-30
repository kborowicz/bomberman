import { Graphics, Point, Text, TextStyle } from 'pixi.js';
import { IRenderable } from '../IRenderable';
import CellSprite from './CellSprite';

export default class WeaponSprite extends CellSprite {

    protected readonly timer: TimerSprite;

    public constructor(cellSize: number) {
        super(cellSize);
        this.timer = new TimerSprite();
        this.timer.renderable.zIndex = 999;

        const { width: w, height: h } = this.timer.renderable;
        this.addChild(this.timer.renderable);
        this.timer.renderable.x = cellSize - w;
        this.timer.renderable.y = cellSize - h;
    }

    public set timerValue(value: number) {
        this.timer.value = value;
    }

}

export class TimerSprite implements IRenderable {

    private readonly circle: Graphics;
    private readonly textStyle: TextStyle;

    public constructor() {
        this.circle = new Graphics()
            .beginFill(0x000000)
            .lineStyle(1, 0xFFFFFF)
            .drawCircle(8, 8, 8);

        this.circle.visible = false;

        this.textStyle = new TextStyle({
            fontFamily: 'Pixeboy',
            fontSize: 16,
            fill: '#fff'
        });
    }

    public get renderable() {
        return this.circle;
    }

    public set value(value: number) {
        if (value < 0) {
            this.circle.visible = false;
            return;
        }

        this.circle.visible = true;
        this.circle.removeChildren();

        const text = new Text(value + '', this.textStyle);
        text.anchor.set(-0.5, 0);

        this.circle.addChild(text);
    }

}