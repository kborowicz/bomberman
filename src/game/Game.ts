import { utils } from 'pixi.js';
import GameContext from './GameContext';
import { ILevel } from './level/Level';
import Resources from './Resources';

export default class Game {

    private _context: GameContext;
    private root: HTMLElement;

    public constructor() {
        utils.skipHello();
    }

    public createContext() {
        if (this._context) {
            this._context.destroy();
        }

        const context = new GameContext();
        this._context = context;
        this.root.replaceChildren(context.app.view);

        return context;
    }

    public async initialize() {
        await Resources.initialize();
        this.root = document.getElementById('canvas-wrapper');
    }
}