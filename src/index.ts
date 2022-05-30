import Game from './game/Game';
import { Level } from './game/level/Level';
import Level1 from './game/level/Level1';
import Level2 from './game/level/Level2';
import './index.scss';

class LevelListElement {

    public readonly level: Level;
    public readonly dom: HTMLElement;

    public constructor(level: Level) {
        this.level = level;
        this.dom = document.createElement('div');
        this.dom.append(level.getName());
        this.dom.classList.add('menu-item');
    }

    public markAsActive(active: boolean) {
        if (active) {
            this.dom.classList.add('active');
        } else {
            this.dom.classList.remove('active');
        }
    }

}

(async () => {
    const menuEl = document.getElementById('menu');
    const levels: Level[] = [new Level1(), new Level2()];

    const game = new Game(async (game) => {
        levels.forEach(level => {
            const listEl = new LevelListElement(level);
            menuEl.append(listEl.dom);
        });

        await levels[0].load(game.context);
        levels[0].start(game.context);
    });

})();