import GameContext from '../GameContext';

export default abstract class Level {

    protected readonly context: GameContext;

    public constructor(context: GameContext) {
        this.context = context;
    }

    public abstract getName(): string;
    public abstract load(): void | Promise<void>;

}