import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { Container, DisplayObject, Sprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import BoundingBox from '../collision/BoundingBox';
import Actor from '../entity/actors/Actor';
import Resources from '../Resources';
import sleep from '../utils/sleep';
import ExplosionSprite from '../sprite/ExplosionSprite';
import Weapon from './Weapon';
import WeaponSprite from '../sprite/WeaponSprite';

export interface IDynamiteProps {

}

export default class Dynamite extends Weapon {

    public async spawnAt(target: BoardCell, owner: Actor) {
        const { app, board, cellSize, ticker, actors } = this.context;
        const { stage } = app;

        // Before explosion
        const dynamiteSprtiee = new WeaponSprite(cellSize);
        dynamiteSprtiee.addAndFill(Sprite.from(Resources.DYNAMITE_TEXTURE));
        dynamiteSprtiee.align(target);
        // dynamiteSprtiee.timerValue = 5;

        const dynamiteSprite = Sprite.from(Resources.DYNAMITE_TEXTURE);
        dynamiteSprite.width = cellSize;
        dynamiteSprite.height = cellSize;
        target.alignObject(dynamiteSprite);

        // stage.addChild(dynamiteSprite);
        stage.addChild(dynamiteSprtiee);
        await sleep(2000);
        // dynamiteSprite.destroy();
        dynamiteSprtiee.destroy();

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

                    const { x, y, width, height } = explosionSprite;
                    const spriteBbox = BoundingBox.fromDims(x, y, width, height);

                    actors.forEach(actor => {
                        const [f1, f2] = actor.bbox.getIntersection(spriteBbox);
                        if (f1 > 0.01 && f2 > 0.01) {
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