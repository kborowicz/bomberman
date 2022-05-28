import BoundingBox from './BoundingBox';

export interface CollisionTest {

    testCollision(bbox: BoundingBox): boolean;

}