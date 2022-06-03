import GameContext from '../GameContext';
import WeaponFactory from '../weapons/WeaponFactory';
import HealthPowerUp from './HealthPowerUp';
import SpeedPowerUp from './SpeedPowerUp';
import WeaponPowerUp from './WeaponPowerUp';

export type PowerUpType = 'health' | 'speed' | 'weapon';

export default class PowerUpFactory {

    private static registeredPowerUps: PowerUpType[] = ['health', 'speed', 'weapon'];

    public static getPowerUp(type: PowerUpType, context: GameContext) {
        switch (type) {
            case 'health': return new HealthPowerUp(context);
            case 'speed': return new SpeedPowerUp(context);
            case 'weapon': return new WeaponPowerUp(context, WeaponFactory.getRandom(context));
        }
    }

    public static getRandom(context: GameContext) {
        const index = Math.floor(Math.random() * PowerUpFactory.registeredPowerUps.length);
        return this.getPowerUp(PowerUpFactory.registeredPowerUps[index], context);
    }

}