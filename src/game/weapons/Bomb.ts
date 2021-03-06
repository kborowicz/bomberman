import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { Howl } from 'howler';
import { Container, DisplayObject, Sprite } from 'pixi.js';
import bombSoundSrc from '../assets/sounds/bomb.mp3';
import { BoardCell } from '../board/BoardCell';
import BoundingBox from '../collision/BoundingBox';
import Actor from '../entity/actors/Actor';
import GameContext from '../GameContext';
import Resources from '../Resources';
import ExplosionSprite from '../sprite/ExplosionSprite';
import WeaponSprite from '../sprite/WeaponSprite';
import BresenhamCircle from '../utils/BresenhamCircle';
import sleep from '../utils/sleep';
import Weapon from './Weapon';

export interface IRingBombProps {
    radius?: number,
    delay?: number,
    propagationDelay?: number;
    destroyBricks?: boolean;
}

export default class Bomb extends Weapon {

    private readonly radius: number;
    private readonly delay: number;
    private readonly propagationDelay: number;
    private readonly destroyBricks: boolean;

    //TODO lepiej rozwiązać dostęp do zmiennej
    public sprite: WeaponSprite;

    public constructor(context: GameContext, props?: IRingBombProps) {
        super(context);

        this.radius = props?.radius ?? 2;
        this.delay = props?.delay ?? 2000;
        this.propagationDelay = props?.propagationDelay ?? 100;
        this.destroyBricks = props?.destroyBricks ?? true;
    }

    public async spawnAt(target: BoardCell, owner: Actor): Promise<void> {
        const { app, board, cellSize, ticker, actors } = this.context;
        const { stage } = app;

        // Before explosion
        const bombSprite = new WeaponSprite(cellSize);
        bombSprite.addAndFill(Sprite.from(Resources.BOMB_TEXTURE));
        bombSprite.align(target);

        this.sprite = bombSprite;

        if (this.delay > 0) {
            stage.addChild(bombSprite);

            const timerSteps = 3;
            const stepDelay = this.delay / timerSteps;
            for (let i = 0; i < timerSteps; i++) {
                bombSprite.timerValue = timerSteps - i;
                await sleep(stepDelay);
            }

            bombSprite.destroy();
        }

        // After explosion
        const addedRenderables: DisplayObject[] = [];
        const shockWaveFilter = new ShockwaveFilter([
            (target.col + 0.5) * cellSize,
            (target.row + 0.5) * cellSize
        ], {
            radius: 200,
            amplitude: 20,
            brightness: 1.5
        });

        if (stage.filters) {
            stage.filters.push(shockWaveFilter);
        } else {
            stage.filters = [shockWaveFilter];
        }

        const updateShockWave = () => shockWaveFilter.time += 0.01;
        ticker.add(updateShockWave);

        const bombSound = new Howl({
            src: [bombSoundSrc],
            volume: 0.1,
            autoplay: true
        });

        for (let i = 0; i < this.radius; i++) {
            const ring = BresenhamCircle.getOutline(target.col, target.row, i + 1);
            ring.forEach(([col, row]) => {
                const cell = board.getCellAt(col, row);

                if (!cell) {
                    return;
                }

                if (this.destroyBricks && cell.isDestroyable) {
                    cell.setAsDefault();
                }

                const explosionSprite = new ExplosionSprite(cellSize);
                cell.alignObject(explosionSprite);

                stage.addChild(explosionSprite);
                addedRenderables.push(explosionSprite);

                const { x, y, width, height } = explosionSprite;
                const spriteBbox = BoundingBox.fromDims(x, y, width, height);

                actors.forEach(actor => {
                    const [f1, f2] = actor.bbox.getIntersection(spriteBbox);
                    if (f1 > 0.01 && f2 > 0.01) {
                        actor.health -= 10;
                    }
                });
            });

            await sleep(this.propagationDelay);
        }

        await sleep(500);

        addedRenderables.forEach(r => r.destroy());
        ticker.remove(updateShockWave);
        stage.filters.splice(stage.filters.indexOf(shockWaveFilter), 1);
    }

    public getRenderable(): Container {
        return new WeaponSprite(this.context.cellSize)
            .addAndFill(Sprite.from(Resources.BOMB_TEXTURE));
    }

}