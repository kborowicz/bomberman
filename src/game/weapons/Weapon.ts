import { BoardCell } from '../board/BoardCell';
import GameContext from '../GameContext';

export default abstract class Weapon {

    protected readonly context: GameContext;

    public constructor(context: GameContext) {
        this.context = context;
    }

    // todo przekazanie powerup'ów
    public abstract spawnAt(cell: BoardCell): void;

}