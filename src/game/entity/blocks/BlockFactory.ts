import GameContext from '@/game/GameContext';
import Bricks from './Bricks';
import Floor from './Floor';
import Wall from './Wall';

export type BlockType = 'grass' | 'wall' | 'bricks';

export default class BlockFactory {

    public static getBlock(type: BlockType, context: GameContext) {
        switch (type) {
            case 'grass': return new Floor(context);
            case 'wall': return new Wall(context);
            case 'bricks': return new Bricks(context);
        }
    }

}