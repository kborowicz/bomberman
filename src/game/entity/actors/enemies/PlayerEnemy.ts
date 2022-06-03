import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import CharacterSprite from '@/game/sprite/CharacterSprite';
import sleep from '@/game/utils/sleep';
import Bomb from '@/game/weapons/Bomb';
import TimeBomb from '@/game/weapons/TimeBomb';
import { OutlineFilter } from '@pixi/filter-outline';
import Resources from '../../../Resources';
import Actor from '../Actor';
import Enemy from './Enemy';
import Movement from './Movement';

export default class PlayerEnemy extends Enemy {

    protected sprite: CharacterSprite;

    public constructor(context: GameContext) {
        super(context);
        this.sprite = new CharacterSprite(context.cellSize, Resources.CHARACTER_1);
        this.sprite.filters = [new OutlineFilter(1)];
        this.container.addChild(this.sprite);

        const {player, board} = context;
        let lastMovement: Movement;

        this.on('spawn', async () => {
            let lastTarget: BoardCell;
            const actor = context.player;

            while (this.isAlive && !context.isDestroyed) {
                if (this.nearestCell.getDistance(actor.nearestCell) <= 4) {
                    const weapon = this.weaponStack.pop();
                    weapon.spawnAt(this.nearestCell, this);

                    lastMovement = this.goTo(board.getRandomNonWallCell());
                    await sleep(2500);
                }

                lastMovement = this.goTo(actor.nearestCell);
                await sleep(1000);
            }
        });

        this.on('move', (dx, dy) => {
            this.sprite.setDirection(dx, dy);
            this.sprite.play();
        });

        this.on('idle', () => this.sprite.stop());
        this.on('die', () => lastMovement?.cancel());
    }

}