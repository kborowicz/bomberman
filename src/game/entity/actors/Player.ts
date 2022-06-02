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

            const { ticker } = context;

            ticker.add(dt => {
                const movementDelta = dt * this.speed;

                let dx = (+this.isDownA * (-1) + +this.isDownD * (+1)) * movementDelta;
                let dy = (+this.isDownW * (-1) + +this.isDownS * (+1)) * movementDelta;

                if (dx == 0 && dy == 0) {
                    this.emmiter.emit('idle');
                    return;
                }

                const dirx = Math.sign(dx);
                const diry = Math.sign(dy);

                if (dx != 0 && dy != 0) {
                    dx = dirx * movementDelta / Math.sqrt(2);
                    dy = diry * movementDelta / Math.sqrt(2);
                }

                const collision = this.move(dx, dy);

                if (!collision || dx != 0 && dy != 0) {
                    return;
                }

                if (dx != 0) {
                    const c0 = this.nearestCell;
                    const b0 = this.bbox;
                    const b1 = this.nearestCell.bbox;

                    if (dx < 0 && c0.wCell.isWall || dx > 0 && c0.eCell.isWall) {
                        return;
                    }

                    const y0 = b0.cy;
                    const y1 = b1.cy;
                    const dy = y1 - y0;

                    if (Math.abs(movementDelta) > Math.abs(dy)) {
                        this.move(0, dy);
                    } else {
                        this.move(0, Math.sign(dy) * movementDelta);
                    }
                } else {
                    const c0 = this.nearestCell;
                    const b0 = this.bbox;
                    const b1 = this.nearestCell.bbox;

                    if (dy < 0 && c0.nCell.isWall || dy > 0 && c0.sCell.isWall) {
                        return;
                    }

                    const x0 = b0.cx;
                    const x1 = b1.cx;
                    const dx = x1 - x0;

                    if (Math.abs(movementDelta) > Math.abs(dx)) {
                        this.move(dx, 0);
                    } else {
                        this.move(Math.sign(dx) * movementDelta, 0);
                    }
                }
            });
        });

        this.on('move', (dx, dy) => {
            this.sprite.setDirection(dx, dy);
            this.sprite.play();
        });

        this.on('idle', () => {
            this.sprite.stop();
        });
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