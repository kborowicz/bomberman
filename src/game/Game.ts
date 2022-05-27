import { Application } from 'pixi.js';
import level1 from './assets/levels/level1.json';
import level2 from './assets/levels/level2.json';
import AStar from './AStart';
import BreadFirstSearch from './BestFirstSearch';
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

        // this.init();
        // Add a ticker callback to move the sprite back and forth
        // let elapsed = 0.0;
        // this.app.ticker.add((delta) => {
        //     elapsed += delta;
        //     sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
        // });
    }

    private async initialize() {
        await Resources.initialize();

        this.board = LevelLoader.load(level2 as ILevelDefinition);
        this.player = new Player(this);

        // const path = BreadFirstSearch.run(
        //     this.board,
        //     this.board.getCellAt(1, 1),
        //     this.board.getCellAt(7, 1)
        // );

        const path = AStar.run(
            this.board.getCellAt(1, 1),
            this.board.getCellAt(7, 1)
        );

        path.forEach(c => c.setAsWood());

        this.app.stage.addChild(this.board.renderable);
        this.app.stage.addChild(this.player.renderable);

        this.app.screen.width = this.board.renderable.width;
        this.app.screen.height = this.board.renderable.height;

        this.app.view.width = this.board.renderable.width;
        this.app.view.height = this.board.renderable.height;
    }

}