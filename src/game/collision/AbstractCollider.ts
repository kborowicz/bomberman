import { CollisionTest } from './CollisionTest';
import { Collider } from './Collider';

export abstract class AbstractCollider implements Collider {

    public testCollision(other: AbstractCollider): boolean {
        return this.getCollisionTest(other)?.testCollision() ?? false;
    }

    public abstract getCollisionTest(other: AbstractCollider): CollisionTest;

}