import { utils } from 'pixi.js';
import GameContext from './GameContext';
import Level from './level/Level';
import Resources from './Resources';

export default class Game {

    private _context: GameContext;
    private root: HTMLElement;

    public constructor(onInit: (context: Game) => void) {
        utils.skipHello();
        this.initialize().then(() => onInit(this));
    }

    public get context(): GameContext {
        return this._context;
    }

    public async loadLevel(level: Level) {
        const {app, board} = this._context;
        await level.load();

        app.screen.width = board.renderable.width;
        app.screen.height = board.renderable.height;

        app.view.width = board.renderable.width;
        app.view.height = board.renderable.height;
    }

    private async initialize() {
        await Resources.initialize();
        this._context = new GameContext();

        this.root = document.getElementById('root');
        this.root.append(this._context.app.view);
    }
}