import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { BoardCell } from '../board/BoardCell';
import Dynamite from './Dynamite';
import RingBomb from './RingBomb';
import Weapon from './Weapon';

export default class MortarBomb extends Weapon {

    public spawnAt(cell: BoardCell): void {
        const mainBomb = new RingBomb(this.game, { radius: 5, propagationDelay: 100, delay: 0 });

        const wave = new ShockwaveFilter([
            (cell.col + 0.5) * this.game.board.cellSize, 
            (cell.row + 0.5) * this.game.board.cellSize
        ], {
            radius: 400,
            amplitude: 15,
            brightness: 1.5
        });

        this.game.app.stage.filters = [wave];

        this.game.app.ticker.add(delta => {
            wave.time += 0.02;
        });

        mainBomb.spawnAt(cell);

        const nonWallCells = this.game.board.cellsTree.getNonWallCells();
        const maxLength = nonWallCells.length - 1;

        // setTimeout(() => {
        //     for (let i = 0; i < 4; i++) {
        //         const index = Math.min(Math.round(Math.random() * maxLength), maxLength);
        //         const cell = nonWallCells[index];

        //         console.log(index);

        //         new Dynamite(this.game).spawnAt(cell);
        //         // new RingBomb(this.game, { radius: 2, delay: 0 }).spawnAt(cell);
        //     }
        // }, 1000);
    }

}
