import GameContext from '../GameContext';

export interface ILevel {

    getName(): string;
    load(context: GameContext): void | Promise<void>;
    start(context: GameContext): void;

}