import GameContext from '@/game/GameContext';
import Bricks from './Bricks';
import Grass from './Grass';
import Wall from './Wall';

export default class BlockFactory {

    public static getBlock(type: string, context: GameContext) {
        switch (type) {
            case 'grass': return new Grass(context);
            case 'wall': return new Wall(context);
            case 'bricks': return new Bricks(context);
        }
    }

}