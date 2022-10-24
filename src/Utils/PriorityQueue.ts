import Heap from "./Heap";


class PriorityQueue<T> {
    dataHeap: Heap<T> = new Heap();
    length: number = 0;

    push(val: T): void{
        this.dataHeap.insert(val);
        this.length++;
    }

    poll(): T|null {
        this.length--;
        return this.dataHeap.removePeek();
    }

    peek(): T|null {
        return this.dataHeap.peek();
    }

}

export default PriorityQueue;