import { Howl } from 'howler';
import { Application, DisplayObject } from 'pixi.js';
import Board from './board/Board';
import Actor from './entity/actors/Actor';
import Player from './entity/actors/Player';
import { IRenderable } from './IRenderable';
import bgMusicSrc from '@/game/assets/sounds/background_music.mp3';
import epicMusicSrc from '@/game/assets/sounds/elden_ring_epic_music.mp3';
import Enemy from './entity/actors/enemies/Enemy';
import { IEventEmitter } from './IEventEmitter';
import EventEmitter from 'eventemitter3';

export interface GameContextEventMap {
    'win': () => void;
    'lose': () => void;
}

export default class GameContext implements IEventEmitter<GameContextEventMap> {

    private readonly emitter = new EventEmitter();
    private _isDestroyed = false;

    private _board: Board;
    private _player: Player;
    private _actors: Actor[] = [];

    public readonly app: Application;

    public readonly backgroundMusic = new Howl({
        src: [bgMusicSrc],
        volume: 0.3,
        loop: true,
        autoplay: false
    });

    public readonly epicMusic = new Howl({
        src: [epicMusicSrc],
        volume: 0.3,
        loop: true,
        autoplay: false
    });

    public constructor() {
        this.app = new Application({
            backgroundColor: 0x3d3d3d
        });

        this.reset();
    }

    public on<K extends keyof GameContextEventMap>(event: K, fn: GameContextEventMap[K]): void {
        this.emitter.on(event + '', fn as any);
    }
    
    public off<K extends keyof GameContextEventMap>(event: K, fn: GameContextEventMap[K]): void {
        this.emitter.off(event + '', fn as any);
    }

    public playerWin() {
        this.emitter.emit('win');
    }

    public playerLose() {
        this.emitter.emit('lose');
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

    public get enemies(): readonly Enemy[] {
        return this._actors.filter(a => a instanceof Enemy) as Enemy[];
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

    public removeActors(...actors: Actor[]) {
        actors.forEach(actor => {
            const index = this._actors.indexOf(actor);
            if (index) {
                this._actors.splice(index, 1);
            }
        });
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
        this.epicMusic.stop();
        this.backgroundMusic.stop();
    }

}