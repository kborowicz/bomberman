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
import {Howl, Howler} from 'howler';
import ExplosionSprite from './ExplosionSprite';
import Actor, { ActorEventMap } from '../entity/actors/Actor';

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

        this.radius = props?.radius ?? 5;
        this.delay = props?.delay ?? 2000;
        this.propagationDelay = props?.propagationDelay ?? 500;
    }

    public spawnAt(target: BoardCell, owner: Actor): void {
        this.onSpawn(target, owner);
    }

    private async onSpawn(cell: BoardCell, owner: Actor) {
        const { app, board, cellSize, ticker, actors } = this.context;
        const { stage } = app;

        // Before explosion
        const bombSprite = Sprite.from(Resources.BOMB_TEXTURE);
        bombSprite.width = cellSize;
        bombSprite.height = cellSize;
        cell.alignObject(bombSprite);

        stage.addChild(bombSprite);
        await sleep(this.delay);
        bombSprite.destroy();

        // After explosion
        const addedRenderables: DisplayObject[] = [];
        const shockWaveFilter = new ShockwaveFilter([
            (cell.col + 0.5) * cellSize,
            (cell.row + 0.5) * cellSize
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

        const cx0 = cell.bbox.cx;
        const cy0 = cell.bbox.cy;

        for (let i = 0; i < this.radius; i++) {
            const ring = BresenhamCircle.getOutline(cell.col, cell.row, i + 1);
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

                const sprite = new ExplosionSprite(cellSize);
                cell.alignObject(sprite);

                stage.addChild(sprite);
                addedRenderables.push(sprite);
            });

            const rSq = (this.radius * cellSize) ** 2;

            actors.forEach(actor => {
                const {cx, cy} = actor.bbox;

                if ((cx - cx0) ** 2 + (cy - cy0) ** 2 <= rSq) {
                    actor.health -= 20;
                }
            });

            await sleep(this.propagationDelay);
        }

        await sleep(500);

        addedRenderables.forEach(r => r.destroy());
        ticker.remove(updateShockWave);
        stage.filters.splice(stage.filters.indexOf(shockWaveFilter), 1);
    }

}