import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { AnimatedSprite } from 'pixi.js';
import { BoardCell } from '../board/BoardCell';
import BresenhamCircle from '../Bresenham';
import GameContext from '../GameContext';
import Resources from '../Resources';
import Weapon from './Weapon';

export interface IRingBombProps {
    radius?: number,
    delay?: number,
    propagationDelay?: number;
}

export default class RingBomb extends Weapon {

    private readonly radius: number;
    private readonly delay: number;
    private readonly propagationDelay: number;

    public constructor(game: GameContext, props?: IRingBombProps) {
        super(game);

        this.radius = props?.radius ?? 5;
        this.delay = props?.delay ?? 1000;
        this.propagationDelay = props?.propagationDelay ?? 300;
    }

    public spawnAt(cell: BoardCell): void {
        setTimeout(() => {

            const wave = new ShockwaveFilter([
                (cell.col + 0.5) * this.context.board.cellSize, 
                (cell.row + 0.5) * this.context.board.cellSize
            ], {
                radius: 400,
                amplitude: 15,
                brightness: 1.5
            });
    
            this.context.app.stage.filters = [wave];

            this.context.ticker.add(delta => {
                wave.time += 0.02;
            });

            for (let i = 0; i < this.radius; i++) {
                setTimeout(() => {
                    const ring = BresenhamCircle.getOutline(cell.col, cell.row, i + 1);
                    ring.forEach(([col, row]) => {
                        const sprite = this.getExplosionSprite(col, row, this.context.board.cellSize);
                        this.context.app.stage.addChild(sprite);
                    });
                }, i * this.propagationDelay);
            }

        }, this.delay);
    }

    private getExplosionSprite(col: number, row: number, cellSize: number) {
        const sprite = new AnimatedSprite(Resources.EXPLOSION_SPRITESHEET.animations['explosion']);
        sprite.width = cellSize;
        sprite.height = cellSize;
        sprite.x = col * cellSize;
        sprite.y = row * cellSize;

        sprite.animationSpeed = 0.3;
        sprite.loop = false;

        sprite.play();

        return sprite;
    }

}