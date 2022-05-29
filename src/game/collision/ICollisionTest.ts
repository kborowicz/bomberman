import BoundingBox from './BoundingBox';

export interface ICollisionTest {

    testCollision(bbox: BoundingBox): boolean;

}