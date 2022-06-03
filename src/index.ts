import Game from './game/Game';
import { ILevel } from './game/level/Level';
import Level1 from './game/level/Level1';
import Level2 from './game/level/Level2';
import Level3 from './game/level/Level3';
import Level4 from './game/level/Level4';
import './index.scss';

class Overlay {

    public readonly dom: HTMLElement;

    public constructor() {
        this.dom = document.createElement('div');
        this.dom.classList.add('overlay');
    }

    public showPlay(onPlayClick: () => void) {
        const button = document.createElement('div');
        button.classList.add('play-button');
        button.append('Play');
        button.addEventListener('click', onPlayClick);

        this.dom.replaceChildren(button);
    }

    public showTryAgain(onTryAgainClick: () => void) {
        const text = document.createElement('div');
        text.classList.add('orange-title');
        text.append('GAME OVER!');

        const button = document.createElement('div');
        button.classList.add('play-button');
        button.append('Try again');
        button.addEventListener('click', onTryAgainClick);

        this.dom.replaceChildren(text, button);
    }

    public showPlayAgain(onPlayAgainClick: () => void) {
        const text = document.createElement('div');
        text.classList.add('orange-title');
        text.append('YOU WIN!');

        const button = document.createElement('div');
        button.classList.add('play-button');
        button.append('Play again');
        button.addEventListener('click', onPlayAgainClick);

        this.dom.replaceChildren(text, button);
    }

}

class LevelListElement {

    public readonly level: ILevel;
    public readonly dom: HTMLElement;

    public constructor(level: ILevel) {
        this.level = level;
        this.dom = document.createElement('div');
        this.dom.append(level.getName());
        this.dom.classList.add('menu-item');
    }

    public set isActive(active: boolean) {
        if (active) {
            this.dom.classList.add('active');
        } else {
            this.dom.classList.remove('active');
        }
    }

}

(async () => {
    const game = new Game();
    await game.initialize();

    const rootEl = document.getElementById('root');
    const menuEl = document.getElementById('menu');
    const overlay = new Overlay();

    const levels = [
        new Level1(),
        new Level2(),
        // new Level3(),
        // new Level4(),
        new Level3(),
        new Level4()
    ];

    const levelListEls: LevelListElement[] = [];

    const loadLevel = async (level: ILevel, instantPlay = false) => {
        const context = game.createContext();
        await level.load(context);

        if (instantPlay) {
            level.start(context);
            overlay.dom.remove();
        } else {
            rootEl.append(overlay.dom);
            overlay.showPlay(async () => {
                level.start(context);
                overlay.dom.remove();
            });
        }

        context.on('win', () => {
            if (context.isDestroyed) {
                return;
            }

            context.destroy();
            rootEl.append(overlay.dom);
            overlay.showPlayAgain(() => loadLevel(level, true));
        });

        context.on('lose', () => {
            if (context.isDestroyed) {
                return;
            }

            context.destroy();
            rootEl.append(overlay.dom);
            overlay.showTryAgain(() => loadLevel(level, true));
        });
    };

    levels.forEach(level => {
        const listEl = new LevelListElement(level);
        listEl.dom.addEventListener('click', async () => {
            levelListEls.forEach(el => el.isActive = false);
            listEl.isActive = true;
            loadLevel(listEl.level);
        });

        menuEl.append(listEl.dom);
        levelListEls.push(listEl);
    });

    levelListEls[0].dom.click();
})();