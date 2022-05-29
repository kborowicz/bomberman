import BlockFactory, { BlockType } from '../entity/blocks/BlockFactory';
import GameContext from '../GameContext';

export default class BoardBuilder {

    private readonly context: GameContext;
    private readonly blocks = new Map<string, BlockType>();

    public constructor(context: GameContext) {
        this.context = context;
    }

    public fillCell(col: number, row: number, type: BlockType) {
        this.blocks.set(this.getCoordsHash(col, row), type);
    }

    public fillRectangle(col0: number, row0: number, col1: number, row1: number, type: BlockType) {
        const c0 = Math.min(col0, col1);
        const r0 = Math.min(row0, row1);
        const c1 = Math.max(col0, col1);
        const r1 = Math.max(row0, row1);

        for (let c = c0; c <= c1; c++) {
            for (let r = r0; r <= r1; r++) {
                this.blocks.set(this.getCoordsHash(c, r), type);
            }
        }
    }

    public fillHorizontalLine(row: number, col0: number, col1: number, type: BlockType) {
        const c0 = Math.min(col0, col1);
        const c1 = Math.max(col0, col1);

        for (let c = c0; c <= c1; c++) {
            this.blocks.set(this.getCoordsHash(c, row), type);
        }
    }

    public fillVerticalLine(col: number, row0: number, row1: number, type: BlockType) {
        const r0 = Math.min(row0, row1);
        const r1 = Math.max(row0, row1);

        for (let r = r0; r <= r1; r++) {
            this.blocks.set(this.getCoordsHash(col, r), type);
        }
    }

    public build() {
        [...this.blocks.entries()].forEach(([key, type]) => {
            const keySplit = key.split('#');
            const col = +keySplit[0];
            const row = +keySplit[1];
            const blockType = BlockFactory.getBlock(type, this.context);

            this.context.board.addCell(col, row, blockType);
        });

        this.blocks.clear();
    }

    private getCoordsHash(col: number, row: number) {
        return col + '#' + row;
    }

}