import Entity from '../Entity';

export default abstract class Block extends Entity {

    public abstract get isWall(): boolean;

    public abstract get isDestroyable(): boolean;

}