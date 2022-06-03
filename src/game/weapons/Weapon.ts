import { Container } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import GameContext from '../GameContext';

export default abstract class Weapon {

    protected readonly context: GameContext;

    public constructor(context: GameContext) {
        this.context = context;
    }

    public abstract spawnAt(target: BoardCell, owner: Actor): void | Promise<void>;

    public abstract getRenderable(): Container;

}