import Game from './game/Game';
import { ILevel } from './game/level/Level';
import Level1 from './game/level/Level1';
import Level2 from './game/level/Level2';
import Level5 from './game/level/Level5';
import './index.scss';

class Overlay {

    public readonly dom: HTMLElement;

    public constructor() {
        this.dom = document.createElement('div');
        this.dom.classList.add('overlay');
    }

    public showPlay(onPlayClick: () => void) {
        const playTitleText = document.createElement('div');
        playTitleText.append('Play');
        playTitleText.classList.add('title');
        playTitleText.addEventListener('click', onPlayClick);

        this.dom.replaceChildren(playTitleText);
    }

    public showGameOver(onTryAgainClick: () => void) {
        const tryAgainTitleText = document.createElement('div');
        tryAgainTitleText.append('Try again');
        tryAgainTitleText.classList.add('title');

        this.dom.replaceChildren(tryAgainTitleText);
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

    const levels = [new Level1(), new Level2(), new Level5()];
    const levelListEls: LevelListElement[] = [];

    levels.forEach(level => {
        const listEl = new LevelListElement(level);
        listEl.dom.addEventListener('click', async () => {
            levelListEls.forEach(el => el.isActive = false);
            listEl.isActive = true;

            const context = game.createContext();

            await listEl.level.load(context);
            rootEl.append(overlay.dom);

            overlay.showPlay(() => {
                listEl.level.start(context);
                overlay.dom.remove();
            });
        });

        menuEl.append(listEl.dom);
        levelListEls.push(listEl);
    });

    levelListEls[0].dom.click();
})();