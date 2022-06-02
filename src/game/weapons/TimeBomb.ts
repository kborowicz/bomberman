import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { Howl } from 'howler';
import { filters, Sprite } from 'pixi.js';
import timeBombSoundSrc from '../assets/sounds/time_bomb.mp3';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import Resources from '../Resources';
import WeaponSprite from '../sprite/WeaponSprite';
import sleep from '../utils/sleep';
import Weapon from './Weapon';

export default class Dynamite extends Weapon {

    private delay = 2000;

    public async spawnAt(target: BoardCell, owner: Actor) {
        const { app, cellSize, ticker, actors } = this.context;
        const { stage } = app;

        // Before explosion
        const dynamiteSprite = new WeaponSprite(cellSize);
        dynamiteSprite.addAndFill(Sprite.from(Resources.DYNAMITE_TEXTURE));
        dynamiteSprite.align(target);

        stage.addChild(dynamiteSprite);

        const timerSteps = 3;
        const stepDelay = this.delay / timerSteps;
        for (let i = 0; i < timerSteps; i++) {
            dynamiteSprite.timerValue = timerSteps - i;
            await sleep(stepDelay);
        }

        dynamiteSprite.destroy();

        const shockWaveFilter = new ShockwaveFilter([
            (target.col + 0.5) * cellSize,
            (target.row + 0.5) * cellSize
        ], {
            radius: 600,
            amplitude: 15,
            brightness: 1.5
        });

        const grayOverlayFilter = new filters.ColorMatrixFilter();
        grayOverlayFilter.greyscale(1, false);
        grayOverlayFilter.alpha = 0.3;

        if (stage.filters) {
            stage.filters.push(shockWaveFilter, grayOverlayFilter);
        } else {
            stage.filters = [shockWaveFilter, grayOverlayFilter];
        }

        let shockWaveIncrement = 0.003;
        let grayOverlayIncrement = 0.007;

        const updateFilters = () => {
            shockWaveFilter.time += shockWaveIncrement;

            let newOverlayAlpha = grayOverlayFilter.alpha + grayOverlayIncrement;
            newOverlayAlpha = Math.max(Math.min(0.5, newOverlayAlpha), 0);

            grayOverlayFilter.alpha = newOverlayAlpha;
        };

        ticker.add(updateFilters);

        const explosionSound = new Howl({
            src: [timeBombSoundSrc],
            volume: 0.5,
            autoplay: true
        });

        const actorsSpeed: [Actor, number][] = [];

        actors.forEach(actor => {
            if (actor != owner) {
                actorsSpeed.push([actor, actor.speed]);
                actor.speed = 1;
            }
        });

        await sleep(2500);

        actorsSpeed.forEach(([actor, prevSpeed]) => {
            actor.speed = prevSpeed;
        });

        shockWaveIncrement = 0.04;
        grayOverlayIncrement = -0.01;

        await sleep(1000);

        ticker.remove(updateFilters);
        stage.filters.splice(stage.filters.indexOf(shockWaveFilter), 1);
        stage.filters.splice(stage.filters.indexOf(grayOverlayFilter), 1);
    }

}