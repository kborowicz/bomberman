import GameContext from '@/game/GameContext';
import Dynamite from '@/game/weapons/Dynamite';
import { Sprite } from 'pixi.js';
import Resources from '../../Resources';
import Actor from './Actor';
import ActorSprite from '../../sprite/CharacterSprite';
import HealthBar from '../../sprite/HealthBar';
import CharacterSprite from '../../sprite/CharacterSprite';

export default class Player extends Actor {

    private _sprite: ActorSprite;

    private isDownW = false;
    private isDownS = false;
    private isDownA = false;
    private isDownD = false;

    public constructor(context: GameContext) {
        super(context);

        this._sprite = new CharacterSprite(context.cellSize, Resources.CHARACTER_1);
        this._sprite.width = this.context.cellSize;
        this._sprite.height = this.context.cellSize;
        this.container.addChild(this._sprite);

        this.on('spawn', () => {
            this.addKeyObserver('w', isDown => this.isDownW = isDown);
            this.addKeyObserver('s', isDown => this.isDownS = isDown);
            this.addKeyObserver('a', isDown => this.isDownA = isDown);
            this.addKeyObserver('d', isDown => this.isDownD = isDown);

            document.addEventListener('keypress', e => {
                if (e.key === ' ') {
                    this.deployBomb();
                }
            });

            this.context.app.ticker.add(dt => {
                const movementDelta = dt * this.speed;

                let dx = (+this.isDownA * (-1) + +this.isDownD * (+1)) * movementDelta;
                let dy = (+this.isDownW * (-1) + +this.isDownS * (+1)) * movementDelta;

                if (dx != 0 && dy != 0) {
                    dx = Math.sign(dx) * movementDelta / Math.sqrt(2);
                    dy = Math.sign(dy) * movementDelta / Math.sqrt(2);
                }

                this.move(dx, dy);
            });
        });

        this.on('move', (dx, dy) => {
            this._sprite.setDirection(dx, dy);
            this._sprite.play();
        });

        this.on('idle', () => this._sprite.stop());
    }

    private deployBomb() {
        const dynamite = new Dynamite(this.context);
        dynamite.spawnAt(this.nearestCell, this);
    }

    private addKeyObserver(key: string, listener: (isDown: boolean) => void) {
        document.addEventListener('keydown', e => {
            if (e.key === key) {
                listener(true);
            }
        });

        document.addEventListener('keyup', e => {
            if (e.key === key) {
                listener(false);
            }
        });
    }

}