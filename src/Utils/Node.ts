
class Node<T> {
    private val: T = 0 as T;
    private prev?: Node<T>|null = null;
    private next?: Node<T>|null = null;

    constructor(val: T){
        this.val = val;
    }

    getVal(): T {
        return this.val
    }

    setVal(val: T): void {
        this.val = val;
    }

    getPrev(): Node<T>|null|undefined {
        if(this.prev != undefined)
        return this.prev;
    }

    setPrev(prev: Node<T>): void {
        this.prev = prev;
    }

    getNext(): Node<T>|null {
        if(this.next)
        return this.next;
        else return null
    }

    setNext(next: Node<T>): void {
        this.next = next;
    }
}

export default Node