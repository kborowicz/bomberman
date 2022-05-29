import { Application, DisplayObject } from 'pixi.js';
import Board from './board/Board';
import Actor from './entity/actors/Actor';
import Player from './entity/actors/Player';
import { IRenderable } from './IRenderable';

export default class GameContext {

    public readonly app: Application;
    public readonly board: Board;

    public readonly player: Player;
    private readonly _actors: Actor[] = [];

    public constructor() {
        this.app = new Application({
            backgroundColor: 0x3d3d3d
        });

        this.board = new Board(this);
        this.addObject(this.board);

        this.player = new Player(this);
        this._actors.push(this.player);
    }

    public get ticker() {
        return this.app.ticker;
    }

    public get cellSize() {
        return this.board.cellSize;
    }

    public get stage() {
        return this.app.stage;
    }

    public get actors(): readonly Actor[] {
        return this._actors;
    }

    public getCellAt(col: number, row: number) {
        return this.board.getCellAt(col, row);
    }

    public addObject(object: IRenderable | DisplayObject) {
        if ((object as IRenderable).renderable) {
            this.app.stage.addChild(object.renderable as DisplayObject);
        } else {
            this.app.stage.addChild(object as DisplayObject);
        }
    }

    public addActor(actor: Actor) {
        this._actors.push(actor);
    }

}