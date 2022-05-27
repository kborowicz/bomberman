import Board from '../board/Board';
import { BoardCell } from '../board/BoardCell';

export default class LevelLoader {

    public static load(level: ILevelDefinition) {
        const blocks = level.blocks.map(b => this.parseBlock(b));
        const board = new Board();

        blocks.forEach(block => {
            for (let col = block.x0; col <= block.x1; col++) {
                for (let row = block.y0; row <= block.y1; row++) {
                    const cell = board.addCell(col, row);

                    switch (block.type) {
                        case 'grass': {
                            cell.setAsGrass();
                            break;
                        }
                        case 'wall': {
                            cell.setAsWall();
                            break;
                        }
                    }
                }

            }
        });

        return board;
    }

    private static parseBlock(blockDef: IBlockDefinition) {
        const coordsSplit = blockDef.coords.split(':');
        const c0 = coordsSplit[0].split(',');

        const x0 = Math.max(Math.round(+c0[0]), 1) - 1;
        const y0 = Math.max(Math.round(+c0[1]), 1) - 1;
        let x1 = x0;
        let y1 = y0;

        if (coordsSplit.length > 1) {
            const c1 = coordsSplit[1].split(',');
            x1 = Math.max(Math.round(+c1[0]), 1) - 1;
            y1 = Math.max(Math.round(+c1[1]), 1) - 1;
        }

        return { x0, y0, x1, y1, type: blockDef.type };
    }

}

export interface ILevelDefinition {
    blocks: IBlockDefinition[]
}

export interface IBlockDefinition {
    coords: string;
    type: 'grass' | 'wall';
}