import Game from './game/Game';
import Level1 from './game/level/Level1';
import './index.scss';

const game = new Game(() => {
    game.loadLevel(new Level1(game.context));

    game.context.player.on('die', () => console.log('game over'));
});