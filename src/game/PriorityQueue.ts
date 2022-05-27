/**
 *  The comparator function must return a positive number when `a > b`, 0 when
 * `a == b` and a negative number when `a < b`.
 */
export type Comparator<T> = (a: T, b: T) => number;

export default class PriorityQueue<T = any> {

    private readonly comparator: Comparator<T>;
    private readonly _elements: T[] = [];

    public constructor(comparator: Comparator<T>) {
        this.comparator = comparator;
    }

    public get elements(): readonly T[] {
        return this._elements;
    }

    public get size() {
        return this._elements.length;
    }

    public isEmpty() {
        return this._elements.length == 0;
    }

    public peek() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty.');
        }

        return this._elements[0];
    }

    /**
      * Dequeues the top element of the priority queue.
      *
      * @throws {Error} when the queue is empty.
      */
    public pop() {
        const first = this.peek();
        const last = this._elements.pop();
        const size = this.size;

        if (size === 0) return first;

        this._elements[0] = last;
        let current = 0;

        while (current < size) {
            let largest = current;
            const left = (2 * current) + 1;
            const right = (2 * current) + 2;

            if (left < size && this.compare(left, largest) >= 0) {
                largest = left;
            }

            if (right < size && this.compare(right, largest) >= 0) {
                largest = right;
            }

            if (largest === current) break;

            this.swap(largest, current);
            current = largest;
        }

        return first;
    }

    /**
      * Enqueues the `element` at the priority queue and returns its new size.
      */
    public push(element: T) {
        const size = this._elements.push(element);
        let current = size - 1;

        while (current > 0) {
            const parent = Math.floor((current - 1) / 2);
            if (this.compare(current, parent) <= 0) {
                break;
            }

            this.swap(parent, current);
            current = parent;
        }

        return size;
    }

    private swap(i: number, j: number) {
        const aux = this._elements[i];
        this._elements[i] = this._elements[j];
        this._elements[j] = aux;
    }

    private compare(i: number, j: number) {
        return this.comparator(this._elements[i], this._elements[j]);
    }

}