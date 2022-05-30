import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import Resources from '@/game/Resources';
import CharacterSprite from '@/game/sprite/CharacterSprite';
import sleep from '@/game/utils/sleep';
import Bomb from '@/game/weapons/Bomb';
import { OutlineFilter } from '@pixi/filter-outline';
import Enemy from './Enemy';

export default class ThrowerEnemy extends Enemy {

    protected sprite: CharacterSprite;

    public constructor(context: GameContext) {
        super(context);
        this.sprite = new CharacterSprite(context.cellSize, Resources.CHARACTER_3);
        this.sprite.filters = [new OutlineFilter(1)];
        this.container.addChild(this.sprite);

        this.speed = 3;

        this.on('spawn', () => {
            const runIfPlayerIsNearby = async () => {
                if (!this.isAlive) {
                    return;
                }

                await sleep(500);

                if (this.isPlayerNearby()) {
                    const randomCell = this.context.board.getRandomNonWallCell();
                    const movement = this.goTo(randomCell, false);

                    if (!movement.isPossible) {
                        runIfPlayerIsNearby();
                    }

                    movement.on('finish', () => runIfPlayerIsNearby());
                    movement.on('change', () => {
                        if (!this.isAlive) {
                            movement.cancel();
                        }
                    });
                    movement.start();
                } else {
                    runIfPlayerIsNearby();
                }
            };

            runIfPlayerIsNearby();

            const throwBomb = async () => {
                if (!this.isAlive) {
                    return;
                }

                await sleep(2500);
                this.throwBombAt(context.player.nearestCell);
                await sleep(1500);
                throwBomb();
            };

            throwBomb();
        });

        this.on('move', (dx, dy) => this.sprite.setDirection(dx, dy));
        this.on('idle', () => {
            this.sprite.stop();
            this.sprite.direction = 'down';
        });
    }

    private isPlayerNearby() {
        const { player, cellSize } = this.context;
        const { cx: cx0, cy: cy0 } = player.bbox;
        const { cx: cx1, cy: cy1 } = this.bbox;

        const distance = Math.sqrt((cx1 - cx0) ** 2 + (cy1 - cy0) ** 2);
        const cellsDistance = Math.round(distance / cellSize);

        return cellsDistance < 4;
    }

    private throwBombAt(target: BoardCell) {
        const { ticker } = this.context;
        const { cx: x0, cy: y0 } = this.nearestCell.bbox;
        const { cx: x1, cy: y1 } = target.bbox;

        const bombDelay = 3000;
        const throwTime = bombDelay;
        const bomb = new Bomb(this.context, { delay: bombDelay });
        bomb.spawnAt(target, this);

        this.nearestCell.alignObject(bomb.sprite);

        const dx = x1 - x0;
        const dy = y1 - y0;

        const vx = dx / throwTime;
        const vy = dy / throwTime;

        const moveBomb = () => {
            const dt = ticker.elapsedMS;

            if (!bomb.sprite.destroyed) {
                bomb.sprite.x += dt * vx;
                bomb.sprite.y += dt * vy;
            }
        };

        ticker.add(moveBomb);

        setTimeout(() => {
            ticker.remove(moveBomb);
        }, throwTime);
    }

}