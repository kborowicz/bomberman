import { AnimatedSprite } from 'pixi.js';
import Actor from './Actor';

export default class Player extends Actor<AnimatedSprite> {
    
    protected get sprite(): AnimatedSprite {
        throw new Error('Method not implemented.');
    }

}