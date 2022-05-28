import { DisplayObject } from 'pixi.js';

export interface Renderable <T extends DisplayObject = DisplayObject> {
    renderable: T;
}