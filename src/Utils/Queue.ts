import Node from "./Node";

class Queue<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    length: number = 0;


    constructor(opt_queue?: Queue<T>) {
        if(opt_queue){
            this.head = opt_queue.head;
            this.tail = opt_queue.tail;
            this.length = opt_queue.length;
        }
    }

    // hardCopy(queue: Queue<T>) {
    //     let curr = queue.head;
    //     this.head = curr;
    //     while(curr?.getNext() != null)
    //     {
    //         curr = curr.getNext();
    //         this
    //     }
    // }

    /**
     * push a value to the queue
     * @param val the value you want to push
     */
    push(val: T) : void {
        let newNode: Node<T> = new Node(val);
        if(this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            let lastEl = this.tail;
            lastEl?.setNext(newNode);
            this.tail = newNode;
        }
        this.length++;
    }

    /**
     * removes and return the head of the queue
     */
    poll(): T | null{
        if(this.head)
        {
            let peek: Node<T> = this.head;
            let val = peek.getVal();
            // console.log("QUEUE::: peek",peek.getVal(),"and next ",peek.getNext());
            
            this.head = peek.getNext()??null;
            this.length --;
            // TODO will we need to free the peek from memory
            return val;
        }else return null;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

}

export default Queue;