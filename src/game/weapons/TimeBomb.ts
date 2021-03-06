import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { Howl } from 'howler';
import { Container, filters, Sprite } from 'pixi.js';
import timeBombSoundSrc from '../assets/sounds/time_bomb.mp3';
import { BoardCell } from '../board/BoardCell';
import Actor from '../entity/actors/Actor';
import GameContext from '../GameContext';
import Resources from '../Resources';
import WeaponSprite from '../sprite/WeaponSprite';
import sleep from '../utils/sleep';
import Weapon from './Weapon';

export interface ITimeBombProps {
    delay: number;
}

export default class TimeBomb extends Weapon {

    private delay: number;

    public constructor(context: GameContext, props?: ITimeBombProps) {
        super(context);
        this.delay = props?.delay ?? 2000; 
    }

    public async spawnAt(target: BoardCell, owner: Actor) {
        const { app, cellSize, ticker, actors } = this.context;
        const { stage } = app;

        // Before explosion
        const dynamiteSprite = new WeaponSprite(cellSize);
        dynamiteSprite.addAndFill(Sprite.from(Resources.TIMEBOMB_TEXTURE));
        dynamiteSprite.align(target);

        if (this.delay > 0) {
            stage.addChild(dynamiteSprite);

            const timerSteps = 3;
            const stepDelay = this.delay / timerSteps;
            for (let i = 0; i < timerSteps; i++) {
                dynamiteSprite.timerValue = timerSteps - i;
                await sleep(stepDelay);
            }
    
            dynamiteSprite.destroy();
        }

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

        let shockWaveIncrement = 0.002;
        let grayOverlayIncrement = 0.007;

        const updateFilters = () => {
            shockWaveFilter.time += shockWaveIncrement;

            let newOverlayAlpha = grayOverlayFilter.alpha + grayOverlayIncrement;
            newOverlayAlpha = Math.max(Math.min(0.5, newOverlayAlpha), 0);

            grayOverlayFilter.alpha = newOverlayAlpha;
        };

        ticker.add(updateFilters);

        const bombSound = new Howl({
            src: [timeBombSoundSrc],
            volume: 0.5,
            autoplay: true
        });

        const actorsSpeed: [Actor, number][] = [];

        actors.forEach(actor => {
            if (actor != owner) {
                const dspeed = Math.max(Math.min(4, actor.speed - 1), 0);
                actorsSpeed.push([actor, dspeed]);
                actor.speed -= dspeed;
            }
        });

        await sleep(3500);

        actorsSpeed.forEach(([actor, dspeed]) => {
            actor.speed += dspeed;
        });

        shockWaveIncrement = 0.04;
        grayOverlayIncrement = -0.01;

        await sleep(1000);

        ticker.remove(updateFilters);
        stage.filters.splice(stage.filters.indexOf(shockWaveFilter), 1);
        stage.filters.splice(stage.filters.indexOf(grayOverlayFilter), 1);
    }

    public getRenderable(): Container {
        return new WeaponSprite(this.context.cellSize)
            .addAndFill(Sprite.from(Resources.TIMEBOMB_TEXTURE));
    }

}