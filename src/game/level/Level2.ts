import FlashEnemy from '../entity/actors/enemies/FlashEnemy';
import PlayerEnemy from '../entity/actors/enemies/PlayerEnemy';
import ThrowerEnemy from '../entity/actors/enemies/ThrowerEnemy';
import GameContext from '../GameContext';
import BoardBuilder from './BoardBuilder';
import { ILevel } from './Level';

export default class Level2 implements ILevel {

    public getName(): string {
        return 'Level 2';
    }

    public load(context: GameContext): void | Promise<void> {
        this.initBoard(context);
        context.resize();
    }

    public start(context: GameContext) {
        context.player.spawnAt(1, 1);

        // const enemy1 = new PlayerEnemy(this.context);
        // enemy1.spawnAt(13, 13);

        // const enemy2 = new FlashEnemy(context);
        // enemy2.spawnAt(13, 13);

        // // const enemy3 = new FlashEnemy(this.context);
        // // enemy3.spawnAt(1, 13);

        // // const enemy4 = new FlashEnemy(this.context);
        // // enemy4.spawnAt(13, 1);



        const enemy5 = new ThrowerEnemy(context);
        enemy5.spawnAt(13, 1);
        context.addActors(enemy5);

        for (let i = 0; i < 6; i++) {
            const cell = context.board.getRandomNonWallCell();
            const enemy = new FlashEnemy(context);
            context.addActors(enemy);
            enemy.spawnAt(cell);
        }

        context.backgroundMusic.play();
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

        builder.build();
    }

}