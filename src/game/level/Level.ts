import GameContext from '../GameContext';

export interface Level {

    getName(): string;
    load(context: GameContext): void | Promise<void>;
    start(context: GameContext): void;

}