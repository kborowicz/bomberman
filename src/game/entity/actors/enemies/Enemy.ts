import { BoardCell } from '../../../board/BoardCell';
import Actor, { ActorEventMap } from '../Actor';
import Movement from './Movement';

export interface EnemyEventMap extends ActorEventMap {
    'movement-change': (dx: number, dy: number) => void
    'movement-finish': () => void
}

export default abstract class Enemy<
    E extends EnemyEventMap = EnemyEventMap
    > extends Actor<E> {

    protected currentMovement: Movement;

    public goTo(col: number, row: number, autostart?: boolean): Movement;
    public goTo(dest: BoardCell, autostart?: boolean): Movement;
    public goTo(arg1: number | BoardCell, arg2: number | boolean = true, arg3 = true): Movement {
        if (this.currentMovement) {
            this.currentMovement.cancel();
        }

        let destCell: BoardCell;

        if (typeof arg1 === 'number') {
            destCell = this.context.board.getCellAt(arg1, arg2 as number);
        } else {
            destCell = arg1;
        }

        const newMovement = new Movement(this, destCell);
        newMovement.on('change', (dx, dy) => this.emitter.emit('movement-change', dx, dy));
        newMovement.on('finish', () => {
            this._isMoving = false;
            this.emitter.emit('movement-finish');
            this.emitter.emit('idle');
        });

        if (arg3) {
            newMovement.start();
        }

        this.currentMovement = newMovement;
        return newMovement;
    }

}