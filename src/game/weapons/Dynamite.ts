import { AnimatedSprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Resources from '../Resources';
import Weapon from './Weapon';

export default class Dynamite extends Weapon {

    private readonly baseRange = 4;

    public spawnAt(cell: BoardCell): void {
        setTimeout(() => {
            const explosionsDelayMs = 60;
            const c0 = cell.col;
            const r0 = cell.row;

            let l = 1;
            let b = 1;
            let r = 1;
            let t = 1;

            const sprites: AnimatedSprite[] = [];

            this.game.app.stage.addChild(this.getExplosionSprite(c0, r0, this.game.board.cellSize));

            for (let i = 0; i < this.baseRange; i++) {
                setTimeout(() => {
                    // top
                    if (this.game.board.getCellAt(c0, r0 + t)?.isWall === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0, r0 + t, this.game.board.cellSize));
                        t++;
                    }

                    // right
                    if (this.game.board.getCellAt(c0 + r, r0)?.isWall === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0 + r, r0, this.game.board.cellSize));
                        r++;
                    }

                    // bottom
                    if (this.game.board.getCellAt(c0, r0 - b)?.isWall === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0, r0 - b, this.game.board.cellSize));
                        b++;
                    }

                    // left
                    if (this.game.board.getCellAt(c0 - l, r0)?.isWall === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0 - l, r0, this.game.board.cellSize));
                        l++;
                    }
                }, i * explosionsDelayMs);
            }

        }, 1000);
    }

    private getExplosionSprite(col: number, row: number, cellSize: number) {
        const sprite = new AnimatedSprite(Resources.EXPLOSION_SPRITESHEET.animations['explosion']);
        sprite.width = cellSize;
        sprite.height = cellSize;
        sprite.x = col * cellSize;
        sprite.y = row * cellSize;

        sprite.animationSpeed = 0.3;
        sprite.loop = false;

        sprite.play();

        return sprite;
    }

}