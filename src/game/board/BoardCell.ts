import { Container } from 'pixi.js';
import { HasBoundingBox } from '../collision/HasBoundingBox';
import Block from '../entity/blocks/Block';
import Grass from '../entity/blocks/Grass';
import { Renderable } from '../Renderable';
import Board from './Board';

export class BoardCell implements Renderable, HasBoundingBox {

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

    public get neighbors(): BoardCell[] {
        return [
            this.board.getCellAt(this.col - 0, this.row - 1),
            // this.board.getCellAt(this.col - 1, this.row - 1),
            this.board.getCellAt(this.col - 1, this.row - 0),
            // this.board.getCellAt(this.col - 1, this.row + 1),
            this.board.getCellAt(this.col - 0, this.row + 1),
            // this.board.getCellAt(this.col + 1, this.row + 1),
            this.board.getCellAt(this.col + 1, this.row - 0),
            // this.board.getCellAt(this.col + 1, this.row - 1),
        ].filter(cell => !!cell);
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
            value = new Grass(this.board.context);
        }

        value.renderable.x = this.col * this.board.cellSize;
        value.renderable.y = this.row * this.board.cellSize;
        value.renderable.width = this.board.cellSize;
        value.renderable.height = this.board.cellSize;

        this._block = value;
        this.board.context.addObject(this._block);
    }

    public setAsDefault() {
        this.block = null;
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