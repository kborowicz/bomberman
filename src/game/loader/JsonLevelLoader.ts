import BlockFactory, { BlockType } from '../entity/blocks/BlockFactory';
import GameContext from '../GameContext';

export default class LevelLoader {

    public static load(level: ILevelDefinition, context: GameContext) {
        const board = context.board;
        const blocksMap = new Map<string, BlockType>();

        level.blocks.forEach(b => {
            const block = this.parseBlock(b);

            for (let col = block.x0; col <= block.x1; col++) {
                for (let row = block.y0; row <= block.y1; row++) {
                    const key = col + '#' + row;
                    blocksMap.set(key, block.type);
                }
            }
        });

        [...blocksMap.entries()].forEach(([key, type]) => {
            const keySplit = key.split('#');
            const col = +keySplit[0];
            const row = +keySplit[1];
            const blockType = BlockFactory.getBlock(type, context);

            board.addCell(col, row, blockType);
        });
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
    type: BlockType
}