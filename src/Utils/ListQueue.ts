

class ListQueue<T> {
    pollArr :   T[] = [] as T[]; 
    pushArr :   T[] = [] as T[]; 
    length: number = 0;

    push(val: T): void {
        this.pushArr.push(val);
        this.pollArr = [val, ...this.pollArr];

        this.length++;
    }

    poll(): T | null {
        this.length--;
        return this.pollArr.pop()??null;
    }

    

}

export default ListQueue;