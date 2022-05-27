import Board from '../board/Board';
import { BoardCell } from '../board/BoardCell';
import Game from '../Game';

export default abstract class Weapon {

    protected readonly game: Game;

    public constructor(game: Game) {
        this.game = game;
    }

    // todo przekazanie powerup'ów
    public abstract spawnAt(cell: BoardCell): void;

}