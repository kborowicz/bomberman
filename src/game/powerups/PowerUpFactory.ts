import GameContext from '../GameContext';
import HealthPowerUp from './HealthPowerUp';
import SpeedPowerUp from './SpeedPowerUp';

export type PowerUpType = 'health' | 'speed';

export default class PowerUpFactory {

    private static registeredPowerUps: PowerUpType[] = ['health', 'speed'];

    public static getPowerUp(type: PowerUpType, context: GameContext) {
        switch (type) {
            case 'health': return new HealthPowerUp(context);
            case 'speed': return new SpeedPowerUp(context);
        }
    }

    public static getRandom(context: GameContext) {
        const index = Math.round(Math.random() * PowerUpFactory.registeredPowerUps.length);
        return this.getPowerUp(PowerUpFactory.registeredPowerUps[index], context);
    }

}