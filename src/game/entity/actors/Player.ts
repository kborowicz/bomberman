import GameContext from '@/game/GameContext';
import Dynamite from '@/game/weapons/Dynamite';
import { Sprite } from 'pixi.js';
import Resources from '../../Resources';
import Actor from './Actor';
import ActorSprite from '../../sprite/CharacterSprite';
import HealthBar from '../../sprite/HealthBar';
import CharacterSprite from '../../sprite/CharacterSprite';
import TimeBomb from '@/game/weapons/TimeBomb';
import { OutlineFilter } from '@pixi/filter-outline';

export default class Player extends Actor {

    private sprite: ActorSprite;

    private isDownW = false;
    private isDownS = false;
    private isDownA = false;
    private isDownD = false;

    public constructor(context: GameContext) {
        super(context);

        this.sprite = new CharacterSprite(context.cellSize, Resources.CHARACTER_1);
        this.sprite.filters = [new OutlineFilter(1)];
        this.container.addChild(this.sprite);

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
            this.sprite.setDirection(dx, dy);
            this.sprite.play();
        });

        this.on('idle', () => this.sprite.stop());
    }

    private deployBomb() {
        const dynamite = new TimeBomb(this.context);
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