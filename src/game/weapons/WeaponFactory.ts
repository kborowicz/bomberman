import GameContext from '../GameContext';
import Bomb from './Bomb';
import Dynamite from './Dynamite';
import TimeBomb from './TimeBomb';
import Weapon from './Weapon';

export type WeaponType = 'bomb' | 'dynamite' | 'timebomb';

export default class WeaponFactory {

    private static registeredWeapons: WeaponType[] = ['bomb', 'dynamite', 'timebomb'];

    public static getWeapon(type: WeaponType, context: GameContext): Weapon {
        switch (type) {
            case 'bomb': return new Bomb(context);
            case 'dynamite': return new Dynamite(context);
            case 'timebomb': return new TimeBomb(context);
        }
    }

    public static getRandom(context: GameContext): Weapon {
        const types: WeaponType[] = ['bomb', 'timebomb'];
        const index = Math.floor(Math.random() * types.length);
        return this.getWeapon(types[index], context);
    }

}