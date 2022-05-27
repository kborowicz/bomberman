import { Collider } from './Collider';

export interface HasCollider<C extends Collider = Collider> {

    collider: C;

}