import Node from "./Node";

class MinHeap<T> {
    public length = 0;
    private nodes: Node<T>[] = [];

    constructor(opt_heap?: MinHeap<T>){
        if(opt_heap){
            this.hardCopy(opt_heap);
        }
    }

    hardCopy(heap: MinHeap<T>): void {
        heap.nodes.forEach(node=>{
            this.nodes.push(new Node(node.getVal()));
            this.length = heap.length;
        })
    }

    insert(val: T){
        console.log("HEAP::: inserting ", val);
        
        let newNode = new Node(val);
        this.nodes[this.length] = newNode;
        let nodeIndex = this.length;
        this.heapifyUp(nodeIndex);
        this.length++;
    }

    insertNode(newNode: Node<T>){
        console.log("HEAP::: inserting node ",newNode);
        
        this.nodes[this.length] = newNode;
        let nodeIndex = this.length;
        this.heapifyUp(nodeIndex);
        this.length++;
    }



    removePeek(): T|null{
        console.log("HEAP::: removing node", this.nodes[0]);
        if(this.length === 0){
            console.log("HEAP::: HEAP IS EMPTY !!!!");
            
            return null;
        }
        let removedNode = this.nodes[0];
        this.nodes[0] = this.nodes[this.length- 1];
        this.length--;
        console.log("HEAP::: the new length", this.length);

        this.heapifyDown(0);

        return removedNode.getVal();
    }

    peek(): T|null{
        if(this.length > 0) return this.nodes[0].getVal();
        else return null;
    }

    removeMax(): T|null{
        let maxNode = this.nodes[this.length];
        this.nodes = this.nodes.filter(n=>n!=this.nodes[this.length -1 ]);
        this.length--;
        return maxNode.getVal();
    }

    private heapifyUp(index: number): void{
        console.log("HEAP::: heapifying up the", index, "with value ",this.nodes[index].getVal());
        console.log("HEAP::: the 0 value is ",this.nodes[0].getVal());
        if(index>0){
            console.log("HEAP::: the index of parent is  ",this.parentIndex(index));
            console.log("HEAP::: the index of the problem is ", index);
            console.log("HEAP::: the index parent value is ",this.parent(index).getVal());
        }
        
        
        // this will heapifyUp the node
        while( (index > 0) ){
            if(this.nodes[index].getVal() >= this.parent(index).getVal()) return;
        console.log("HEAP::: heapifying", index);
            // swaps the node with his parent
            this.swap(index,this.parentIndex(index))
            index = this.parentIndex(index);
            console.log("value at index ",index," is ",this.nodes[index].getPrev());
            console.log("value at parent ",this.parentIndex(index)," is ",this.parent(index).getVal());
            
        }
    }

    private swap(index_1: number,index_2: number): void{
        let tmp = this.nodes[index_1];
        this.nodes[index_1] = this.nodes[index_2];
        this.nodes[index_2] = tmp;
    }

    private parentIndex(index: number): number{
        console.log("HEAP::: ",index,"Parent is ",Math.floor((index-1)/2));
        if(index > 0)
        return Math.floor((index-1)/2);
        else return -1;
    }

    private parent(index: number): Node<T>{
        let parent = this.nodes[this.parentIndex(index)];
        return parent;
    }



    private heapifyDown(index: number): void{
        console.log("HEAP:::heapifyDown heapifying down index",index, " of value ",this.nodes[index].getVal());
        
        let leftChildIndex = this.leftChildIndex(index);
        let rightChildIndex = this.rightChildIndex(index);

        // Heapifying down the first node
        // TODO understand this condition
        while(index < this.length && this.leftChildIndex(index) < this.length){
            console.log("HEAP::: inside the while");
            
            let smallerChildIndex = (this.leftChild(index).getVal() < this.rightChild(index).getVal() )?leftChildIndex:rightChildIndex;
            if(this.nodes[smallerChildIndex].getVal() < this.nodes[index].getVal())
            {
                console.log("HEAP::: Swapping");
                
                this.swap(smallerChildIndex,index);
                index = smallerChildIndex;
            }else return;
        }
    }

    private leftChildIndex(index: number): number{
        return index*2 + 1;
    }

    private rightChildIndex(index: number): number{
        return index*2 + 1;
    }

    private leftChild(index: number): Node<T> {
        return this.nodes[this.leftChildIndex(index)];
    }

    private rightChild(index: number): Node<T>{
        return this.nodes[this.rightChildIndex(index)];
    }
    

}


export default MinHeap;