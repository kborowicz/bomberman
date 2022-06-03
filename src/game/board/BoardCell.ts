import { Container } from 'pixi.js';
import { IHasBoundingBox } from '../collision/IHasBoundingBox';
import Block from '../entity/blocks/Block';
import Floor from '../entity/blocks/Floor';
import { IRenderable } from '../IRenderable';
import Board from './Board';

export class BoardCell implements IRenderable, IHasBoundingBox {

    public readonly board: Board;
    public readonly col: number;
    public readonly row: number;

    protected _block: Block;

    public constructor(col: number, row: number, block: Block, board: Board) {
        this.board = board;
        this.col = col;
        this.row = row;
        this._block = block;
    }

    public get renderable() {
        return this._block.renderable;
    }

    public get bbox() {
        return this._block.bbox;
    }

    public get hash() {
        return this.col + '#' + this.row;
    }

    public get isWall() {
        return this._block.isWall;
    }

    public get isDestroyable() {
        return this._block.isDestroyable;
    }

    public get block() {
        return this._block;
    }

    public set block(value: Block) {
        if (value === this._block) {
            return;
        }

        if (this._block) {
            this._block.renderable.destroy();
        }

        if (!value) {
            value = new Floor(this.board.context);
        }

        value.renderable.x = this.col * this.board.cellSize;
        value.renderable.y = this.row * this.board.cellSize;
        value.renderable.width = this.board.cellSize;
        value.renderable.height = this.board.cellSize;

        this._block = value;
        this.board.renderable.addChild(this._block.renderable);

        // TODO powiadamianie boarda o zmianie 
    }

    public get nCell() {
        return this.board.getCellAt(this.col - 0, this.row - 1);
    }

    public get nwCell() {
        return this.board.getCellAt(this.col - 1, this.row - 1);
    }

    public get wCell() {
        return this.board.getCellAt(this.col - 1, this.row - 0);
    }

    public get swCell() {
        return this.board.getCellAt(this.col - 1, this.row + 1);
    }

    public get sCell() {
        return this.board.getCellAt(this.col - 0, this.row + 1);
    }

    public get seCell() {
        return this.board.getCellAt(this.col + 1, this.row + 1);
    }

    public get eCell() {
        return this.board.getCellAt(this.col + 1, this.row + 0);
    }

    public get neCell() {
        return this.board.getCellAt(this.col + 1, this.row - 1);
    }

    public getNeighbors(diaglonal = true) {
        const neighbors = [this.nCell, this.wCell, this.sCell, this.eCell];

        if (diaglonal) {
            neighbors.push(this.nwCell, this.swCell, this.seCell, this.neCell);
        }

        return neighbors.filter(cell => !!cell);
    }

    public setAsDefault() {
        this.block = null;
    }

    public getDistance(other: BoardCell) {
        const b0 = this.bbox;
        const b1 = other.bbox;

        const dx = b1.cx - b0.cx;
        const dy = b1.cy - b0.cy;

        return Math.sqrt(dx ** 2 + dy ** 2) / this.board.cellSize;
    }

    public alignObject(object: Container) {
        const cellSize = this.board.cellSize;
        const x0 = this.col * cellSize;
        const y0 = this.row * cellSize;

        const w = object.width;
        const h = object.height;

        object.x = x0 + (cellSize - w) / 2;
        object.y = y0 + (cellSize - h) / 2;
    }

}