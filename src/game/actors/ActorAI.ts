import { Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from './Actor';
import Movement from './Movement';

export default abstract class ActorAI<
    S extends Sprite = Sprite
> extends Actor<S> {

    protected abstract get sprite(): S;

    protected currentMovement: Movement;

    public goTo(col: number, row: number): Movement;
    public goTo(dest: BoardCell): Movement;
    public goTo(arg1: number | BoardCell, arg2?: number): Movement {
        if (this.currentMovement) {
            this.currentMovement.cancel();
        }

        let newMovement: Movement;

        if (typeof arg1 === 'number') {
            newMovement = new Movement(this, this.context.board.getCellAt(arg1, arg2));
        } else {
            newMovement = new Movement(this, arg1);
        }

        this.currentMovement = newMovement;

        return newMovement;
    }

}