import { Container } from 'pixi.js';
import { BoardCell } from '../../../board/BoardCell';
import Actor, { ActorEventMap } from '../Actor';
import Movement from './Movement';

export interface EnemyEventMap extends ActorEventMap {
    'movement-change': (dx: number, dy: number) => void
    'movement-finish': () => void
}

export default abstract class Enemy<
    T extends Container = Container,
    E extends EnemyEventMap = EnemyEventMap
> extends Actor<T, E> {

    protected currentMovement: Movement;

    public goTo(col: number, row: number, autostart?: boolean): Movement;
    public goTo(dest: BoardCell, autostart?: boolean): Movement;
    public goTo(arg1: number | BoardCell, arg2: number | boolean = true, arg3 = true): Movement {
        if (this.currentMovement) {
            this.currentMovement.cancel();
        }

        const srcCell = this.nearestCell;
        let destCell: BoardCell;

        if (typeof arg1 === 'number') {
            destCell = this.context.board.getCellAt(arg1, arg2 as number);
        } else {
            destCell = arg1;
        }

        const newMovement = new Movement(this, srcCell, destCell);
        newMovement.on('change', (dx, dy) => this.emmiter.emit('movement-change', dx, dy));
        newMovement.on('finish', () => this.emmiter.emit('movement-finish'));

        if (arg3) {
            newMovement.start();
        }

        this.currentMovement = newMovement;
        return newMovement;
    }

}