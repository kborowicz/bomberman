import { Container, DisplayObject } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import BoundingBox from '../collision/BoundingBox';
import { HasBoundingBox } from '../collision/HasBoundingBox';
import GameContext from '../GameContext';
import { Renderable } from '../Renderable';

export default abstract class Entity<
    T extends Container = Container
> implements Renderable<T>, HasBoundingBox {

    public readonly context: GameContext;

    public constructor(context: GameContext) {
        this.context = context;
    }

    public get bbox() {
        const { x, y, width, height } = this.renderable;
        return BoundingBox.fromDims(x, y, width, height);
    }

    public abstract get renderable(): T;

}