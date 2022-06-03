import { BoardCell } from '@/game/board/BoardCell';
import GameContext from '@/game/GameContext';
import sleep from '@/game/utils/sleep';
import Bomb from '@/game/weapons/Bomb';

export interface IThrowBombAtArgs {
    context: GameContext;
    src: BoardCell;
    dest: BoardCell;
    bombDelay?: number;
    throwTime?: number;
}

const throwBombAt = async (args: IThrowBombAtArgs) => {
    const { 
        context, 
        src, 
        dest,
        bombDelay = 3000,
        throwTime = bombDelay
    } = args;
    const { ticker } = context;

    const { cx: x0, cy: y0 } = src.bbox;
    const { cx: x1, cy: y1 } = dest.bbox;

    const bomb = new Bomb(context, { delay: bombDelay });
    bomb.spawnAt(dest, this);
    src.alignObject(bomb.sprite);

    const dx = x1 - x0;
    const dy = y1 - y0;

    const vx = dx / throwTime;
    const vy = dy / throwTime;

    const moveBomb = () => {
        const dt = ticker.elapsedMS;

        if (!bomb.sprite.destroyed) {
            bomb.sprite.x += dt * vx;
            bomb.sprite.y += dt * vy;
        }
    };

    ticker.add(moveBomb);

    await sleep(throwTime);

    setTimeout(() => {
        ticker.remove(moveBomb);
    }, throwTime);
};

export default throwBombAt;