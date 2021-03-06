import GameContext from '@/game/GameContext';
import Resources from '@/game/Resources';
import CharacterSprite from '@/game/sprite/CharacterSprite';
import TombstoneSprite from '@/game/sprite/TombstoneSprite';
import sleep from '@/game/utils/sleep';
import Dynamite from '@/game/weapons/Dynamite';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
import { Howl } from 'howler';
import { Point } from 'pixi.js';
import Enemy from './Enemy';
import zapSoundSrc from '@/game/assets/zap.mp3';
import WeaponStack from '../WeaponStack';
import Bomb from '@/game/weapons/Bomb';

export default class FlashEnemy extends Enemy {

    protected sprite: CharacterSprite;

    public constructor(context: GameContext) {
        super(context);
        this.sprite = new CharacterSprite(context.cellSize, Resources.CHARACTER_2);
        this.container.addChild(this.sprite);

        const motionBlurFilter = new MotionBlurFilter();
        motionBlurFilter.kernelSize = 15;

        this.sprite.filters = [motionBlurFilter];
        this.speed = 6;

        const zapSound = new Howl({
            src: [zapSoundSrc],
            volume: 0.1,
            html5: true
        });

        this.on('spawn', () => {
            const startNewMove = async () => {
                if (!this.isAlive || context.isDestroyed) {
                    return;
                }

                this.sprite.direction = 'down';
                this.sprite.play();

                motionBlurFilter.velocity = new Point(0, 0);
                await sleep(500, 1500);
                zapSound.play();

                const randomCell = this.context.board.getRandomNonWallCell();
                const movement = this.goTo(randomCell, false);

                if (!movement.isPossible) {
                    startNewMove();
                }

                movement.on('finish', () => startNewMove());
                movement.on('change', () => {
                    if (!this.isAlive) {
                        movement.cancel();
                    }
                });
                movement.start();
            };

            startNewMove();

            const deployWeapon = async () => {
                if (!this.isAlive || context.isDestroyed) {
                    return;
                }

                await sleep(2500, 3000);

                const weapon = this.weaponStack.pop();
                weapon.spawnAt(this.nearestCell, this);

                deployWeapon();
            };

            deployWeapon();
        });

        this.on('movement-change', (dx, dy) => {
            motionBlurFilter.velocity = new Point(dx * 3, dy * 3);
        });

        this.on('move', (dx, dy) => {
            this.sprite.setDirection(dx, dy);
            this.sprite.play();
        });

        this.on('idle', () => this.sprite.stop());
    }

}