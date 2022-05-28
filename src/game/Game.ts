import { Application } from 'pixi.js';
import BatEnemy from './entity/actors/enemies/BatEnemy';
import level2 from './assets/levels/level2.json';
import GameContext from './GameContext';
import LevelLoader, { ILevelDefinition } from './loader/LevelLoader';
import Resources from './Resources';
import Player from './entity/actors/Player';
import RingBomb from './weapons/RingBomb';

export default class Game {

    private _context: GameContext;

    public constructor() {
        this.run();
    }

    public get context(): GameContext {
        return this._context;
    }

    private async run() {
        await Resources.initialize();
        this.createContext();

        const { app, board, player } = this.context;

        player.setPosition(board.getCellAt(2, 2));

        const bat1 = new BatEnemy(this.context);
        bat1.speed = 1;
        bat1.setPosition(8, 8);
        bat1.goTo(14, 14);

        const bat2 = new BatEnemy(this.context);
        bat2.setPosition(board.getCellAt(17, 17));

        app.stage.addChild(board.renderable);
        app.stage.addChild(player.renderable);
        app.stage.addChild(bat1.renderable);
        app.stage.addChild(bat2.renderable);

        const ringBonb = new RingBomb(this.context);
        ringBonb.spawnAt(board.getCellAt(6, 6));

        // setTimeout(() => {
        //     const cells = board.cellsTree.getNonWallCells();
        //     const cell = cells[Math.floor(Math.random() * cells.length - 1)];
        //     cell.setAsWood();
        //     bat1.goTo(cell);
        //     // bat2.goTo(cell);
        // }, 1000);

        document.getElementById('root').append(app.view);

        app.screen.width = board.renderable.width;
        app.screen.height = board.renderable.height;

        app.view.width = board.renderable.width;
        app.view.height = board.renderable.height;
    }

    private createContext() {
        const app = new Application();
        const board = LevelLoader.load(level2 as ILevelDefinition);

        this._context = new GameContext(app, board);
    }

}