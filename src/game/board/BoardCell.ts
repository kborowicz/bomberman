import { Sprite } from 'pixi.js';
import BoxCollider from '../collision/colliders/BoxCollider';
import { HasCollider } from '../collision/HasCollider';
import Rectangle from '../collision/shapes/Rectangle';
import { Renderable } from '../Renderable';
import Resources from '../Resources';
import Board from './Board';

export class BoardCell implements Renderable, HasCollider {

    private readonly sprite: Sprite;
    private readonly board: Board;
    private _isWall = false;

    public readonly col: number;
    public readonly row: number;
    public readonly collider: BoxCollider;

    public constructor(col: number, row: number, size: number, board: Board) {
        this.board = board;
        this.col = col;
        this.row = row;

        const x0 = col * size;
        const y0 = row * size;
        const x1 = x0 + size;
        const y1 = y0 + size;

        this.sprite = new Sprite(Resources.GRASS_TEXTURE);
        this.collider = new BoxCollider(Rectangle.fromCoords(x0, y0, x1, y1));

        this.sprite.width = size;
        this.sprite.height = size;
        this.sprite.x = x0;
        this.sprite.y = y0;
    }

    public get neighbors(): BoardCell[] {
        return [
            this.board.getCellAt(this.col - 0, this.row - 1),
            this.board.getCellAt(this.col - 1, this.row - 1),
            this.board.getCellAt(this.col - 1, this.row - 0),
            this.board.getCellAt(this.col - 1, this.row + 1),
            this.board.getCellAt(this.col - 0, this.row + 1),
            this.board.getCellAt(this.col + 1, this.row + 1),
            this.board.getCellAt(this.col + 1, this.row - 0),
            this.board.getCellAt(this.col + 1, this.row - 1),
        ].filter(cell => !!cell);
    }

    public get hash() {
        return this.col + '#' + this.row;
    }

    public get renderable() {
        return this.sprite;
    }

    public get isWall() {
        return this._isWall;
    }

    public get wCell() {
        return this.board.getCellAt(this.col - 1, this.row);
    }

    public get wMove() {
        return this.eCell?.isWall === false;
    }

    public get sCell() {
        return this.board.getCellAt(this.col, this.row - 1);
    }

    public get sMove() {
        return this.eCell?.isWall === false;
    }

    public get eCell() {
        return this.board.getCellAt(this.col + 1, this.row);
    }

    public get eMove() {
        return this.eCell?.isWall === false;
    }

    public get nCell() {
        return this.board.getCellAt(this.col, this.row + 1);
    }

    public get nMove() {
        return this.nCell?.isWall === false;
    }

    public get nwCell() {
        return this.board.getCellAt(this.col - 1, this.row - 1);
    }

    public get nwMove() {
        return (
            this.nwCell?.isWall === false &&
            this.nCell?.isWall === false &&
            this.wCell?.isWall === false
        );
    }

    public get swCell() {
        return this.board.getCellAt(this.col - 1, this.row + 1);
    }

    public get swMove() {
        return (
            this.swCell?.isWall === false &&
            this.sCell?.isWall === false &&
            this.wCell?.isWall === false
        );
    }

    public get seCell() {
        return this.board.getCellAt(this.col + 1, this.row + 1);
    }

    public get seMove() {
        return (
            this.seCell?.isWall === false &&
            this.sCell?.isWall === false &&
            this.eCell?.isWall === false
        );
    }

    public get neCell() {
        return this.board.getCellAt(this.col + 1, this.row - 1);
    }

    public get neMove() {
        return (
            this.neCell?.isWall === false &&
            this.nCell?.isWall === false &&
            this.eCell?.isWall === false
        );
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

}