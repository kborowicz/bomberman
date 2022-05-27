import { Application } from 'pixi.js';
import level2 from './assets/levels/level2.json';
import Board from './board/Board';
import LevelLoader, { ILevelDefinition } from './loader/LevelLoader';
import Player from './Player';
import Resources from './Resources';

export default class Game {

    public app: Application;

    public board: Board;
    private player: Player;

    public constructor() {
        this.app = new Application();
        document.getElementById('root').append(this.app.view);

        this.initialize();
    }

    private async initialize() {
        await Resources.initialize();

        this.board = LevelLoader.load(level2 as ILevelDefinition);
        this.player = new Player(this);

        this.app.stage.addChild(this.board.renderable);
        this.app.stage.addChild(this.player.renderable);

        this.app.screen.width = this.board.renderable.width;
        this.app.screen.height = this.board.renderable.height;

        this.app.view.width = this.board.renderable.width;
        this.app.view.height = this.board.renderable.height;
    }

}