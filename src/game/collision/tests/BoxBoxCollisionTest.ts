import BoxCollider from '../colliders/BoxCollider';
import { CollisionTest } from '../CollisionTest';

export default class BoxBoxCollisionTest implements CollisionTest {

    private b1: BoxCollider;
    private b2: BoxCollider;

    public constructor(b1: BoxCollider, b2: BoxCollider) {
        this.b1 = b1;
        this.b2 = b2;
    }

    public testCollision(): boolean {
        return this.b1.box.intersectsRect(this.b2.box);
    }

}