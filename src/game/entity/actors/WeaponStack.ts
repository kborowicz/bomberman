import Weapon from '@/game/weapons/Weapon';

export type DefaultWaponProvider = () => Weapon;

export interface IWeaponStackProps {
    defaultWeaponProvider: DefaultWaponProvider;
}

export default class WeaponStack {

    public defaultWeaponProvider: DefaultWaponProvider;
    private readonly stack: Weapon[] = [];

    public constructor(defaultWeaponProvider: DefaultWaponProvider) {
        this.defaultWeaponProvider = defaultWeaponProvider;
    }

    public push(weapon: Weapon): void {
        this.stack.push(weapon);
    }

    public pop() {
        if (this.stack.length == 0) {
            return this.defaultWeaponProvider();
        } else {
            return this.stack.pop();
        }
    }

}