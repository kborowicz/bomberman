import Rectangle from '../shapes/Rectangle';
import BoxBoxCollisionTest from '../tests/BoxBoxCollisionTest';
import { CollisionTest } from '../CollisionTest';
import { AbstractCollider } from '../AbstractCollider';

export default class BoxCollider extends AbstractCollider {

    public readonly box: Rectangle;

    public constructor(box: Rectangle) {
        super();
        this.box = box;
    }

    public getCollisionTest(other: AbstractCollider): CollisionTest {
        if (other instanceof BoxCollider) {
            return new BoxBoxCollisionTest(this, other);
        }
    }

}