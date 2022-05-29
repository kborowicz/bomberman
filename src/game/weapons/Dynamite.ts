import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { Container, DisplayObject, Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import Resources from '../Resources';
import sleep from '../utils/sleep';
import ExplosionSprite from './ExplosionSprite';
import Weapon from './Weapon';

export interface IDynamiteProps {

}

export default class Dynamite extends Weapon {

    public spawnAt(target: BoardCell, owner: Actor): void {
        this.onSpawn(target, owner);
    }

    private async onSpawn(target: BoardCell, owner: Actor) {
        const { app, board, cellSize, ticker, actors } = this.context;
        const { stage } = app;

        // Before explosion
        const dynamiteSprite = Sprite.from(Resources.DYNAMITE_TEXTURE);
        dynamiteSprite.width = cellSize;
        dynamiteSprite.height = cellSize;
        target.alignObject(dynamiteSprite);

        stage.addChild(dynamiteSprite);
        await sleep(2000);
        dynamiteSprite.destroy();

        // After explosion
        const addedRenderables: DisplayObject[] = [];
        const shockWaveFilter = new ShockwaveFilter([
            (target.col + 0.5) * cellSize,
            (target.row + 0.5) * cellSize
        ], {
            radius: 100,
            amplitude: 15,
            brightness: 1.2
        });

        if (stage.filters) {
            stage.filters.push(shockWaveFilter);
        } else {
            stage.filters = [shockWaveFilter];
        }

        const updateShockWave = () => shockWaveFilter.time += 0.01;
        ticker.add(updateShockWave);

        const { col: c0, row: r0 } = target;

        let si = true;
        let wi = true;
        let ni = true;
        let ei = true;

        const processCell = (cell: BoardCell): boolean => {
            if (cell) {
                if (cell.isDestroyable) {
                    cell.setAsDefault();
                    return false;
                }

                if (!cell.isWall) {
                    const explosionSprite = new ExplosionSprite(cellSize);
                    addedRenderables.push(explosionSprite);
                    cell.alignObject(explosionSprite);
                    stage.addChild(explosionSprite);

                    actors.forEach(actor => {
                        if (cell.hash == actor.nearestCell.hash) {
                            actor.health -= 20;
                        }
                    });
                } else {
                    return false;
                }

                return true;
            } else {
                return false;
            }
        };

        for (let i = 0; i < 5; i++) {
            const ncell: BoardCell = ni ? board.getCellAt(c0 - 0, r0 - i) : null;
            const wcell: BoardCell = wi ? board.getCellAt(c0 - i, r0 - 0) : null;
            const scell: BoardCell = si ? board.getCellAt(c0 + 0, r0 + i) : null;
            const ecell: BoardCell = ei ? board.getCellAt(c0 + i, r0 + 0) : null;

            ni = processCell(ncell);
            wi = processCell(wcell);
            si = processCell(scell);
            ei = processCell(ecell);

            await sleep(200);
        }

        await sleep(500);
        
        addedRenderables.forEach(r => r.destroy());
        ticker.remove(updateShockWave);
        stage.filters.splice(stage.filters.indexOf(shockWaveFilter), 1);
    }

}