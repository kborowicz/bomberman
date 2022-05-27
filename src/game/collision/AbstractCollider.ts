import { CollisionTest } from './CollisionTest';
import { Collider } from './Collider';

export abstract class AbstractCollider implements Collider {

    public testCollision(other: Collider): boolean {
        return this.getCollisionTest(other)?.testCollision() ?? false;
    }

    public abstract getCollisionTest(other: Collider): CollisionTest;

}