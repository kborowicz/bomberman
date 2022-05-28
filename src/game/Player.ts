import { Application, Sprite, Texture } from 'pixi.js';
import playerImg from './assets/player.png';
import Board from './board/Board';
import BoundingBox from './collision/BoundingBox';
import { HasBoundingBox } from './collision/HasBoundingBox';
import Game from './Game';
import { Renderable } from './Renderable';
import Dynamite from './weapons/Dynamite';
import MortarBomb from './weapons/MortarBomb';
import RingBomb from './weapons/RingBomb';

export default class Player implements Renderable, HasBoundingBox {

    private readonly sprite: Sprite;
    private readonly game: Game;

    private isDownW = false;
    private isDownS = false;
    private isDownA = false;
    private isDownD = false;

    public constructor(game: Game) {
        this.game = game;
        const board = this.game.board;
        const app = this.game.app;

        this.sprite = Sprite.from(Texture.from(playerImg));

        this.sprite.width = board.cellSize;
        this.sprite.height = board.cellSize;

        this.sprite.x = 64;
        this.sprite.y = 64;

        this.addKeyObserver('w', isDown => this.isDownW = isDown);
        this.addKeyObserver('s', isDown => this.isDownS = isDown);
        this.addKeyObserver('a', isDown => this.isDownA = isDown);
        this.addKeyObserver('d', isDown => this.isDownD = isDown);

        document.addEventListener('keypress', e => {
            if (e.key == ' ') {
                const dynamite = new Dynamite(game);
                const ringBomb = new RingBomb(game);
                const mortar = new MortarBomb(game);
                mortar.spawnAt(this.nearestBoardCell);
            }
        });

        // app.ticker.add(timeDelta => {
        //     const speed = 4.5;
        //     const movementDelta = timeDelta * speed;

        //     let dx = (+this.isDownA * (-1) + +this.isDownD * (+1)) * movementDelta;
        //     let dy = (+this.isDownW * (-1) + +this.isDownS * (+1)) * movementDelta;

        //     if (dx != 0 && dy != 0) {
        //         dx = Math.sign(dx) * movementDelta / Math.sqrt(2);
        //         dy = Math.sign(dy) * movementDelta / Math.sqrt(2);
        //     }

        //     if (dx != 0) {
        //         const newCollider = new BoxCollider(this.collider.box.shiftX(dx));

        //         if (!board.collider.testCollision(newCollider)) {
        //             this.sprite.x = newCollider.box.x0;
        //         } else {
        //             this.sprite.x = Math.round(this.sprite.x / board.cellSize) * board.cellSize;
        //         }
        //     }

        //     if (dy != 0) {
        //         const newCollider = new BoxCollider(this.collider.box.shiftY(dy));

        //         if (!board.collider.testCollision(newCollider)) {
        //             this.sprite.y = newCollider.box.y0;
        //         } else {
        //             this.sprite.y = Math.round(this.sprite.y / board.cellSize) * board.cellSize;
        //         }
        //     }
        // });
    }

    public get renderable() {
        return this.sprite;
    }

    public get bbox() {
        const x0 = this.sprite.x;
        const y0 = this.sprite.y;
        const x1 = x0 + this.sprite.width;
        const y1 = y0 + this.sprite.height;

        return BoundingBox.fromCoords(x0, y0, x1, y1);
    }

    public get nearestBoardCell() {
        return this.game.board.getCellAt(
            Math.round(this.sprite.x / this.game.board.cellSize),
            Math.round(this.sprite.y / this.game.board.cellSize)
        );
    }

    private addKeyObserver(key: string, listener: (isDown: boolean) => void) {
        document.addEventListener('keydown', e => {
            if (e.key === key) {
                listener(true);
            }
        });

        document.addEventListener('keyup', e => {
            if (e.key === key) {
                listener(false);
            }
        });
    }

}