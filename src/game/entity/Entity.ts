import EventEmitter from 'eventemitter3';
import { Container } from 'pixi.js';
import BoundingBox from '../collision/BoundingBox';
import { IHasBoundingBox } from '../collision/IHasBoundingBox';
import { IEventEmitter } from '../IEventEmitter';
import GameContext from '../GameContext';
import { IRenderable } from '../IRenderable';

export interface EntityEventMap {
}

export default abstract class Entity<
    E extends EntityEventMap = EntityEventMap
    > implements IRenderable, IEventEmitter<E>, IHasBoundingBox {

    public readonly context: GameContext;
    protected readonly emitter: EventEmitter;
    protected container: Container;

    public constructor(context: GameContext) {
        this.context = context;
        this.emitter = new EventEmitter();
        this.container = new Container();

        this.container.width = context.cellSize;
        this.container.height = context.cellSize;
    }

    public get bbox() {
        const { x, y, width, height } = this.renderable;
        return BoundingBox.fromDims(x, y, width, height);
    }

    public on<K extends keyof E>(event: K, fn: E[K]): void {
        this.emitter.on(event + '', fn as any);
    }

    public off<K extends keyof E>(event: K, fn: E[K]): void {
        this.emitter.off(event + '', fn as any);
    }

    public get renderable() {
        return this.container;
    }

}