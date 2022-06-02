import { Howl } from 'howler';
import { Application, DisplayObject } from 'pixi.js';
import Board from './board/Board';
import Actor from './entity/actors/Actor';
import Player from './entity/actors/Player';
import { IRenderable } from './IRenderable';
import bgMusicSrc from '@/game/assets/sounds/background_music.mp3';

export default class GameContext {

    public readonly app: Application;
    private _isDestroyed = false;

    private _board: Board;
    private _player: Player;
    private _actors: Actor[] = [];

    public readonly backgroundMusic = new Howl({
        src: [bgMusicSrc],
        volume: 0.3,
        loop: true
    });

    public constructor() {
        this.app = new Application({
            backgroundColor: 0x3d3d3d
        });

        this.reset();
    }

    public reset() {
        this.app.stage.removeChildren();
        this._actors = [];

        this._board = new Board(this);
        this.addObject(this._board);

        this._player = new Player(this);
        this._actors.push(this._player);
    }

    public get isDestroyed() {
        return this._isDestroyed;
    }

    public get ticker() {
        return this.app.ticker;
    }

    public get cellSize() {
        return this._board.cellSize;
    }

    public get stage() {
        return this.app.stage;
    }

    public get actors(): readonly Actor[] {
        return this._actors;
    }

    public get player() {
        return this._player;
    }

    public get board() {
        return this._board;
    }

    public getCellAt(col: number, row: number) {
        return this._board.getCellAt(col, row);
    }

    public addObject(object: IRenderable | DisplayObject) {
        if ((object as IRenderable).renderable) {
            this.app.stage.addChild(object.renderable as DisplayObject);
        } else {
            this.app.stage.addChild(object as DisplayObject);
        }
    }

    public addActors(...actors: Actor[]) {
        this._actors.push(...actors);
    }

    public resize() {
        const { app, board } = this;

        app.screen.width = board.renderable.width;
        app.screen.height = board.renderable.height;

        app.view.width = board.renderable.width;
        app.view.height = board.renderable.height;
    }

    public start() {
        this.ticker.start();
    }

    public stop() {
        this.ticker.stop();
    }

    public destroy() {
        this._isDestroyed = true;
        this.backgroundMusic.stop();
    }

}