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
    T extends Container = Container,
    E extends EntityEventMap = EntityEventMap
    > implements IRenderable<T>, IEventEmitter<E>, IHasBoundingBox {

    public readonly context: GameContext;
    protected readonly emmiter: EventEmitter;

    public constructor(context: GameContext) {
        this.context = context;
        this.emmiter = new EventEmitter();
    }

    public get bbox() {
        const { x, y, width, height } = this.renderable;
        return BoundingBox.fromDims(x, y, width, height);
    }

    public on<K extends keyof E>(event: K, fn: E[K]): void {
        this.emmiter.on(event + '', fn as any);
    }

    public off<K extends keyof E>(event: K, fn: E[K]): void {
        this.emmiter.off(event + '', fn as any);
    }

    public abstract get renderable(): T;

}