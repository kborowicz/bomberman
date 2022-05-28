import { Container, Sprite } from 'pixi.js';
import { BoardCell } from '../../../board/BoardCell';
import Actor from '../Actor';
import Movement from './Movement';

export default abstract class Enemy<
    T extends Container = Container
> extends Actor<T> {

    protected currentMovement: Movement;

    public goTo(col: number, row: number): Movement;
    public goTo(dest: BoardCell): Movement;
    public goTo(arg1: number | BoardCell, arg2?: number): Movement {
        if (this.currentMovement) {
            this.currentMovement.cancel();

            //TODO gładka zmiana ruchów
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