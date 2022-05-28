import { Application, DisplayObject } from 'pixi.js';
import Board from './board/Board';
import Actor from './entity/actors/Actor';
import Player from './entity/actors/Player';
import { Renderable } from './Renderable';

export default class GameContext {

    public readonly app: Application;
    public readonly board: Board;

    public readonly actors: Actor[] = [];
    public readonly player: Player;

    public constructor() {
        this.app = new Application({
            backgroundColor: 0x3d3d3d
        });

        this.board = new Board(this);
        this.player = new Player(this);
        this.actors.push(this.player);

        this.addObject(this.board);
        this.addObject(this.player);
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

    public addObject(object: Renderable | DisplayObject) {
        if ((object as Renderable).renderable) {
            this.app.stage.addChild(object.renderable as DisplayObject);
        } else {
            this.app.stage.addChild(object as DisplayObject);
        }
    }

}