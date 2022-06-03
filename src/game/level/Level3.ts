import FlashEnemy from '../entity/actors/enemies/FlashEnemy';
import ThrowerEnemy from '../entity/actors/enemies/ThrowerEnemy';
import GameContext from '../GameContext';
import PowerUpFactory from '../powerups/PowerUpFactory';
import sleep from '../utils/sleep';
import BoardBuilder from './BoardBuilder';
import { ILevel } from './Level';

export default class Level3 implements ILevel {

    public getName(): string {
        return 'Level 3';
    }

    public load(context: GameContext): void | Promise<void> {
        this.initBoard(context);
        context.resize();
    }

    public start(context: GameContext) {
        context.player.spawnAt(7, 7);

        const t1 = new ThrowerEnemy(context);
        t1.spawnAt(1, 1);

        const t2 = new ThrowerEnemy(context);
        t2.spawnAt(1, 13);

        const t3 = new ThrowerEnemy(context);
        t3.spawnAt(13, 13);

        const t4 = new ThrowerEnemy(context);
        t4.spawnAt(13, 1);

        const f1 = new FlashEnemy(context);
        f1.spawnAt(3, 7);

        const f2 = new FlashEnemy(context);
        f2.spawnAt(7, 3);

        const f3 = new FlashEnemy(context);
        f3.spawnAt(7, 11);

        const f4 = new FlashEnemy(context);
        f4.spawnAt(11, 7);

        context.addActors(t1, t2, t3, t4, f1, f2, f3, f4);
        context.backgroundMusic.play();

        (async () => {
            while (!context.isDestroyed) {
                await sleep(8000);
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

        builder.fillRectangle(1, 1, 3, 3, 'bricks');
        builder.fillCell(1, 1, 'grass');
        builder.fillCell(2, 2, 'wall');
        builder.fillCell(3, 3, 'wall');

        builder.fillRectangle(1, 13, 3, 11, 'bricks');
        builder.fillCell(1, 13, 'grass');
        builder.fillCell(2, 12, 'wall');
        builder.fillCell(3, 11, 'wall');

        builder.fillRectangle(13, 13, 11, 11, 'bricks');
        builder.fillCell(13, 13, 'grass');
        builder.fillCell(12, 12, 'wall');
        builder.fillCell(11, 11, 'wall');

        builder.fillRectangle(13, 1, 11, 3, 'bricks');
        builder.fillCell(13, 1, 'grass');
        builder.fillCell(12, 2, 'wall');
        builder.fillCell(11, 3, 'wall');

        builder.fillHorizontalLine(5, 2, 12, 'wall');
        builder.fillHorizontalLine(9, 2, 12, 'wall');

        builder.fillVerticalLine(9, 2, 12, 'wall');
        builder.fillVerticalLine(5, 2, 12, 'wall');

        builder.fillCell(7, 5, 'bricks');
        builder.fillCell(5, 7, 'bricks');
        builder.fillCell(7, 9, 'bricks');
        builder.fillCell(9, 7, 'bricks');

        builder.fillHorizontalLine(7, 1, 2, 'bricks');
        builder.fillHorizontalLine(7, 13, 12, 'bricks');

        builder.fillVerticalLine(7, 1, 2, 'bricks');
        builder.fillVerticalLine(7, 13, 12, 'bricks');

        builder.build();
    }

}