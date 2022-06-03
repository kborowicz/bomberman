import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import Resources from '@/game/Resources';
import CharacterSprite from '@/game/sprite/CharacterSprite';
import sleep from '@/game/utils/sleep';
import Bomb from '@/game/weapons/Bomb';
import { OutlineFilter } from '@pixi/filter-outline';
import Enemy from './Enemy';
import throwBombAt from './throwBombAt';

export interface IThrowerEnemyProps {
    runAwayFromPlayer?: boolean;
}

export default class ThrowerEnemy extends Enemy {

    protected sprite: CharacterSprite;

    private runAwayFromPlayer: boolean;

    public constructor(context: GameContext, props?: IThrowerEnemyProps) {
        super(context);
        this.sprite = new CharacterSprite(context.cellSize, Resources.CHARACTER_3);
        this.sprite.filters = [new OutlineFilter(1)];
        this.container.addChild(this.sprite);

        this.speed = 2.5;
        this._maxHealth = 80;
        this.health = 80;

        this.runAwayFromPlayer = props?.runAwayFromPlayer ?? true;

        this.on('spawn', () => {
            if (this.runAwayFromPlayer) {
                const runIfPlayerIsNearby = async () => {
                    if (!this.isAlive || context.isDestroyed) {
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
                            if (!this.isAlive || context.isDestroyed) {
                                movement.cancel();
                            }
                        });
                        movement.start();
                    } else {
                        runIfPlayerIsNearby();
                    }
                };

                runIfPlayerIsNearby();
            }

            const throwBomb = async () => {
                if (!this.isAlive || context.isDestroyed) {
                    return;
                }

                await sleep(1500, 3000);

                if (!this.isMoving) {
                    throwBombAt({
                        context,
                        src: this.nearestCell,
                        dest: context.player.nearestCell
                    });
                    await sleep(500);
                }

                throwBomb();
            };

            throwBomb();
        });

        this.on('move', (dx, dy) => {
            this.sprite.setDirection(dx, dy);
            this.sprite.play();
        });

        this.on('idle', () => {
            this.sprite.direction = 'down';
            this.sprite.stop();
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

}