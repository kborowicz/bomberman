import GameContext from '@/game/GameContext';
import Resources from '@/game/Resources';
import sleep from '@/game/utils/sleep';
import Bomb from '@/game/weapons/Bomb';
import Dynamite from '@/game/weapons/Dynamite';
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
import { Container, Point, Sprite } from 'pixi.js';
import ActorSprite from '../ActorSprite';
import Enemy from './Enemy';

export default class FlashEnemy extends Enemy {

    private _sprite: ActorSprite;

    public constructor(context: GameContext) {
        super(context);
        this._sprite = new ActorSprite(Resources.CHARACTER_2);
        this._sprite.width = this.context.cellSize;
        this._sprite.height = this.context.cellSize;

        const motionBlurFilter = new MotionBlurFilter();
        motionBlurFilter.kernelSize = 15;

        this._sprite.filters = [motionBlurFilter];
        this.speed = 6;

        this.on('spawn', () => {
            const startNewMove = async () => {
                this._sprite.direction = 'down';
                this._sprite.play();
                
                motionBlurFilter.velocity = new Point(0, 0);
                await sleep(Math.random() * (1500 - 500) + 500);

                const randomCell = this.context.board.getRandomNonWallCell();
                const movement = this.goTo(randomCell, false);

                if (!movement.isPossible) {
                    startNewMove();
                }

                movement.on('finish', () => startNewMove());
                movement.start();
            };

            startNewMove();

            const deployBomb = async () => {
                await sleep(Math.random() * (3000 - 2500) + 2500);
                // const bomb = new Bomb(this.context);
                // bomb.spawnAt(this.nearestCell, this);

                const dynamite = new Dynamite(this.context);
                dynamite.spawnAt(this.nearestCell, this);

                deployBomb();
            };

            deployBomb();
        });

        this.on('movement-change', (dx, dy) => {
            motionBlurFilter.velocity = new Point(dx * 3, dy * 3);
        });

        this.on('move', (dx, dy) => {
            this._sprite.setDirection(dx, dy);
            this._sprite.play();
        });

        this.on('idle', () => this._sprite.stop());
    }

    public get renderable(): Container {
        return this._sprite;
    }

}