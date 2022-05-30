import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { AnimatedSprite, Container, DisplayObject, Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import BresenhamCircle from '../utils/BresenhamCircle';
import Floor from '../entity/blocks/Floor';
import GameContext from '../GameContext';
import Resources from '../Resources';
import Weapon from './Weapon';
import sleep from '../utils/sleep';

import explosionSoundSrc from '../assets/explosion/explosion.mp3';
import { Howl, Howler } from 'howler';
import ExplosionSprite from './ExplosionSprite';
import Actor, { ActorEventMap } from '../entity/actors/Actor';
import BoundingBox from '../collision/BoundingBox';

export interface IRingBombProps {
    radius?: number,
    delay?: number,
    propagationDelay?: number;
}

export default class Bomb extends Weapon {

    private readonly radius: number;
    private readonly delay: number;
    private readonly propagationDelay: number;

    public constructor(context: GameContext, props?: IRingBombProps) {
        super(context);

        this.radius = props?.radius ?? 3;
        this.delay = props?.delay ?? 2000;
        this.propagationDelay = props?.propagationDelay ?? 100;
    }

    public async spawnAt(target: BoardCell, owner: Actor): Promise<void> {
        const { app, board, cellSize, ticker, actors } = this.context;
        const { stage } = app;

        // Before explosion
        const bombSprite = Sprite.from(Resources.BOMB_TEXTURE);
        bombSprite.width = cellSize;
        bombSprite.height = cellSize;
        target.alignObject(bombSprite);

        stage.addChild(bombSprite);
        await sleep(this.delay);
        bombSprite.destroy();

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

        const explosionSound = new Howl({
            src: [explosionSoundSrc],
            volume: 0.1
        });
        explosionSound.play();

        const cx0 = target.bbox.cx;
        const cy0 = target.bbox.cy;

        for (let i = 0; i < this.radius; i++) {
            const ring = BresenhamCircle.getOutline(target.col, target.row, i + 1);
            ring.forEach(([col, row]) => {
                const cell = board.getCellAt(col, row);

                // if (!cell || cell.isWall && !cell.isDestroyable) {
                //     return;
                // }

                if (!cell) {
                    return;
                }

                if (cell.isDestroyable) {
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
                        actor.health -= 20;
                    }
                });
            });

            const rSq = (this.radius * cellSize) ** 2;

            await sleep(this.propagationDelay);
        }

        await sleep(500);

        addedRenderables.forEach(r => r.destroy());
        ticker.remove(updateShockWave);
        stage.filters.splice(stage.filters.indexOf(shockWaveFilter), 1);
    }
    
}