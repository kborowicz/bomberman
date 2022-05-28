import { Container, Sprite } from 'pixi.js';
import BoundingBox from '../collision/BoundingBox';
import { HasBoundingBox } from '../collision/HasBoundingBox';
import { Renderable } from '../Renderable';
import Resources from '../Resources';
import Board from './Board';

export class BoardCell implements Renderable, HasBoundingBox {

    protected readonly sprite: Sprite;
    protected readonly board: Board;
    protected _isWall = false;

    public readonly col: number;
    public readonly row: number;
    public readonly bbox: BoundingBox;

    public constructor(col: number, row: number, size: number, board: Board) {
        this.board = board;
        this.col = col;
        this.row = row;

        const x0 = col * size;
        const y0 = row * size;
        const x1 = x0 + size;
        const y1 = y0 + size;

        this.sprite = new Sprite(Resources.GRASS_TEXTURE);
        this.bbox = BoundingBox.fromCoords(x0, y0, x1, y1);

        this.sprite.width = size;
        this.sprite.height = size;
        this.sprite.x = x0;
        this.sprite.y = y0;
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
    
    //TODO get/set block (Block)

    public get hash() {
        return this.col + '#' + this.row;
    }

    public get renderable() {
        return this.sprite;
    }

    public get isWall() {
        return this._isWall;
    }

    public setAsWall(isDestroyable = false) {
        this._isWall = true;
        this.sprite.texture = Resources.WALL_TEXTURE;
    }

    public setAsGrass() {
        this.sprite.texture = Resources.GRASS_TEXTURE;
    }

    public setAsWood() {
        this.sprite.texture = Resources.WOOD_TEXTURE;
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