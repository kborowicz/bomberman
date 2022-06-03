import FlashEnemy from '../entity/actors/enemies/FlashEnemy';
import PlayerEnemy from '../entity/actors/enemies/PlayerEnemy';
import ThrowerEnemy from '../entity/actors/enemies/ThrowerEnemy';
import GameContext from '../GameContext';
import PowerUpFactory from '../powerups/PowerUpFactory';
import sleep from '../utils/sleep';
import BoardBuilder from './BoardBuilder';
import { ILevel } from './Level';

export default class Level1 implements ILevel {

    public getName(): string {
        return 'Level 1';
    }

    public load(context: GameContext): void | Promise<void> {
        this.initBoard(context);
        context.resize();
    }

    public start(context: GameContext) {
        context.player.spawnAt(1, 1);

        const p1 = new PlayerEnemy(context);
        p1.spawnAt(13, 13);

        context.board.getCellAt(7, 7).block = PowerUpFactory.getPowerUp('speed', context);

        context.addActors(p1);
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

        builder.fillRectangle(2, 3, 12, 3, 'wall');
        builder.fillRectangle(6, 3, 8, 3, 'bricks');

        builder.fillRectangle(3, 2, 3, 12, 'wall');
        builder.fillRectangle(3, 6, 3, 8, 'bricks');

        builder.fillRectangle(2, 11, 12, 11, 'wall');
        builder.fillRectangle(6, 11, 8, 11, 'bricks');

        builder.fillRectangle(11, 2, 11, 12, 'wall');
        builder.fillRectangle(11, 6, 11, 8, 'bricks');

        builder.fillCell(7, 1, 'wall');
        builder.fillCell(1, 7, 'wall');
        builder.fillCell(7, 13, 'wall');
        builder.fillCell(13, 7, 'wall');

        builder.fillVerticalLine(6, 5, 9, 'wall');
        builder.fillVerticalLine(8, 5, 9, 'wall');

        builder.fillHorizontalLine(6, 5, 9, 'wall');
        builder.fillHorizontalLine(8, 5, 9, 'wall');

        builder.fillVerticalLine(7, 5, 9, 'bricks');
        builder.fillHorizontalLine(7, 5, 9, 'bricks');
        builder.fillCell(7, 7, 'grass');

        builder.fillCell(2, 2, 'bricks');
        builder.fillCell(2, 12, 'bricks');
        builder.fillCell(12, 2, 'bricks');
        builder.fillCell(12, 12, 'bricks');

        builder.build();
    }

}