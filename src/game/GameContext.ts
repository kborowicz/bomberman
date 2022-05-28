import { Application } from 'pixi.js';
import Actor from './entity/actors/Actor';
import Player from './entity/actors/Player';
import Board from './board/Board';

export default class GameContext {

    public readonly app: Application;
    public readonly board: Board;

    public readonly actors: Actor[] = [];
    public readonly player: Player;

    public constructor(app: Application, board: Board) {
        this.app = app;
        this.board = board;
        this.player = new Player(this);
    }

    public get ticker() {
        return this.app.ticker;
    }

    public get cellSize() {
        return this.board.cellSize;
    }

}