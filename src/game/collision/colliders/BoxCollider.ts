import Rectangle from '../shapes/Rectangle';
import BoxBoxCollisionTest from '../tests/BoxBoxCollisionTest';
import { CollisionTest } from '../CollisionTest';
import { AbstractCollider } from '../AbstractCollider';
import { Collider } from '../Collider';

export default class BoxCollider extends AbstractCollider {

    public readonly box: Rectangle;

    public constructor(box: Rectangle) {
        super();
        this.box = box;
    }

    public getCollisionTest(other: Collider): CollisionTest {
        if (other instanceof BoxCollider) {
            return new BoxBoxCollisionTest(this, other);
        }
    }

    public shiftX(dx: number): BoxCollider {
        return new BoxCollider(this.box.shiftX(dx));
    }
    
    public shiftY(dy: number): BoxCollider {
        return new BoxCollider(this.box.shiftY(dy));
    }

}