
class Node {
    private val: number|string = 0;
    private prev: Node|null = null;

    constructor(val: number|string){
        this.val = val;
    }

    getVal(): number|string{
        return this.val
    }
    setVal(val: number|string): void{
        this.val = val;
    }

    getPrev(): Node|null{
        return this.prev;
    }
    setPrev(prev: Node): void{
        this.prev = prev;
    }
}

export default Node