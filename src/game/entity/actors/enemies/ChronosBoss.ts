import GameContext from '@/game/GameContext';
import Resources from '@/game/Resources';
import CharacterSprite from '@/game/sprite/CharacterSprite';
import sleep from '@/game/utils/sleep';
import TimeBomb from '@/game/weapons/TimeBomb';
import Bricks from '../../blocks/Bricks';
import Enemy from './Enemy';
import FlashEnemy from './FlashEnemy';
import PlayerEnemy from './PlayerEnemy';
import throwBombAt from './throwBombAt';
import ThrowerEnemy from './ThrowerEnemy';

export default class ChronosBoss extends Enemy {

    protected sprite: CharacterSprite;

    public constructor(context: GameContext) {
        super(context);
        this.sprite = new CharacterSprite(context.cellSize, Resources.CHARACTER_4);
        this.container.addChild(this.sprite);

        this._maxHealth = 700;
        this._health = 700;

        this.on('spawn', () => {
            this.spawnEnemiesTask(context);
            this.throwBombsTask(context);
            this.rebuildWallTask(context);
        });
    }

    private async spawnEnemiesTask(context: GameContext) {
        while (this.isAlive && !context.isDestroyed) {
            const throwerEnemy = new ThrowerEnemy(context, { runAwayFromPlayer: false });
            throwerEnemy.spawnAt(context.board.getRandomNonWallCell());
            context.addActors(throwerEnemy);

            const playerEnemy = new PlayerEnemy(context);
            playerEnemy.spawnAt(context.board.getRandomNonWallCell());
            context.addActors(playerEnemy);

            const flashEnemy = new FlashEnemy(context);
            flashEnemy.spawnAt(context.board.getRandomNonWallCell());
            context.addActors(flashEnemy);

            await sleep(30000);
        }
    }

    private async throwBombsTask(context: GameContext) {
        await sleep(5000);

        while (this.isAlive && !context.isDestroyed) {
            await sleep(3000);

            for (let i = 0; i < 3; i++) {
                throwBombAt({
                    context,
                    src: this.nearestCell,
                    dest: context.player.nearestCell
                });

                await sleep(500);
            }
        }
    }

    private async rebuildWallTask(context: GameContext) {
        while (this.isAlive && !context.isDestroyed) {
            await sleep(20000);

            const timeBomb = new TimeBomb(context, {delay: 0});
            timeBomb.spawnAt(this.nearestCell, this);

            for (let i = 0; i < 3; i++) {
                context.board.getCellAt(5 - i, 7).block = new Bricks(context);
                context.board.getCellAt(9 + i, 7).block = new Bricks(context);
                context.board.getCellAt(7, 5 - i).block = new Bricks(context);
                context.board.getCellAt(7, 9 + i).block = new Bricks(context);
                await sleep(500);
            }

            for (let i = 0; i < 3; i++) {
                context.board.getCellAt(6 + i, 1).block = new Bricks(context);
                context.board.getCellAt(1, 6 + i).block = new Bricks(context);
                context.board.getCellAt(6 + i, 13).block = new Bricks(context);
                context.board.getCellAt(13, 6 + i).block = new Bricks(context);
            }
        }
    }

}