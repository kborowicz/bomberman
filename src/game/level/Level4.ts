import ChronosBoss from '../entity/actors/enemies/ChronosBoss';
import GameContext from '../GameContext';
import PowerUpFactory from '../powerups/PowerUpFactory';
import sleep from '../utils/sleep';
import Bomb from '../weapons/Bomb';
import TimeBomb from '../weapons/TimeBomb';
import BoardBuilder from './BoardBuilder';
import { ILevel } from './Level';

export default class Level4 implements ILevel {

    public getName(): string {
        return 'Level 4 [BOSS]';
    }

    public async load(context: GameContext): Promise<void> {
        this.initBoard(context);
        context.resize();

        if (context.epicMusic.state() == 'loaded') {
            return;
        }

        await new Promise<void>(resolve => {
            context.epicMusic.once('load', () => {
                resolve();
            });
        });
    }

    public start(context: GameContext) {
        context.player.spawnAt(1, 1);
        context.epicMusic.play();

        (async () => {
            await sleep(19150);

            const timeBomb = new TimeBomb(context, { delay: 0 });
            const bomb = new Bomb(context, {
                delay: 0, radius: 6, propagationDelay: 100, destroyBricks: false
            });

            const spawnCell = context.board.getCellAt(7, 7);

            const chronos = new ChronosBoss(context);
            chronos.spawnAt(spawnCell);
            context.addActors(chronos);

            timeBomb.spawnAt(spawnCell, null);
            bomb.spawnAt(spawnCell, null);

            while (!context.isDestroyed) {
                await sleep(5000);
                const cell = context.board.getRandomNonWallCell();
                const powerUp = PowerUpFactory.getRandom(context);
                cell.block = powerUp;
            }
        })();
    }

    private initBoard(context: GameContext) {
        const builder = new BoardBuilder(context);

        builder.fillRectangle(0, 0, 14, 14, 'wall');
        builder.fillRectangle(1, 1, 13, 13, 'grass');

        builder.fillRectangle(5, 5, 9, 9, 'wall');
        builder.fillRectangle(6, 6, 8, 8, 'grass');

        builder.fillRectangle(4, 4, 5, 5, 'bricks');
        builder.fillRectangle(9, 9, 10, 10, 'bricks');
        builder.fillRectangle(4, 9, 5, 10, 'bricks');
        builder.fillRectangle(9, 4, 10, 5, 'bricks');

        builder.fillHorizontalLine(7, 3, 6, 'bricks');
        builder.fillHorizontalLine(7, 8, 11, 'bricks');

        builder.fillVerticalLine(7, 3, 6, 'bricks');
        builder.fillVerticalLine(7, 8, 11, 'bricks');

        builder.fillRectangle(2, 2, 4, 4, 'wall');
        builder.fillVerticalLine(3, 2, 3, 'grass');
        builder.fillHorizontalLine(3, 2, 3, 'grass');

        builder.fillRectangle(4, 4, 2, 2, 'wall');
        builder.fillRectangle(2, 2, 3, 3, 'grass');
        builder.fillCell(2, 2, 'wall');

        builder.fillRectangle(10, 10, 12, 12, 'wall');
        builder.fillRectangle(11, 11, 12, 12, 'grass');
        builder.fillCell(12, 12, 'wall');

        builder.fillRectangle(10, 4, 12, 2, 'wall');
        builder.fillRectangle(11, 3, 12, 2, 'grass');
        builder.fillCell(12, 2, 'wall');

        builder.fillRectangle(4, 10, 2, 12, 'wall');
        builder.fillRectangle(3, 11, 2, 12, 'grass');
        builder.fillCell(2, 12, 'wall');

        builder.fillVerticalLine(1, 6, 8, 'bricks');
        builder.fillVerticalLine(13, 6, 8, 'bricks');

        builder.fillHorizontalLine(1, 6, 8, 'bricks');
        builder.fillHorizontalLine(13, 6, 8, 'bricks');

        builder.build();
    }

}