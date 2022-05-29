import { DisplayObject } from 'pixi.js';

export interface IRenderable<T extends DisplayObject = DisplayObject> {
    renderable: T;
}