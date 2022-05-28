import level2 from './assets/levels/level2.json';
import BatEnemy from './entity/actors/enemies/BatEnemy';
import GameContext from './GameContext';
import LevelLoader, { ILevelDefinition } from './loader/LevelLoader';
import Resources from './Resources';
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
        this._context = new GameContext();

        LevelLoader.load(level2 as ILevelDefinition, this._context);

        const { app, board } = this._context;
        document.getElementById('root').append(app.view);

        app.screen.width = board.renderable.width;
        app.screen.height = board.renderable.height;

        app.view.width = app.screen.width;
        app.view.height = app.screen.height;

        // const ringBomb = new RingBomb(this.context);
        // ringBomb.spawnAt(board.getCellAt(7, 7));

        const p = new BatEnemy(this.context);
        p.setPosition(13, 13);
        p.goTo(1, 1);

        setTimeout(() => {
            p.goTo(13, 1);
        }, 2221);

        this.context.addObject(p);
    }

}