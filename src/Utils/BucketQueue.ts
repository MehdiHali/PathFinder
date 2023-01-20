import { Prioritized } from "./types";



/**
 * BucketQueue is an array based implementation of PriorityQueue
 * it is fast and suitable for numbers
 */
class BucketQueue {
    // highest Priority
    private peak: number = 0;
    // lowest priority
    private tail: number = 0;
    private count: number = 0;
    private arr: Array<Array<Prioritized>> = [];


    insert (el: Prioritized): void{
        // console.log("starting inserting",el);
        
        // if(!this.isEmpty()){
            // console.log("current length",this.arr.length,this.arr);
            // console.log("peak",this.peak,"tail",this.tail);
            
            
        //     console.log("comparing with current priority",this.arr[this.peak][0].priority);
            // if(count <= 1){}
            // if the new element has higher priority then update the peak
            if(el.priority >= (this.isEmpty()?Number.MIN_VALUE:this.peak))
            {
                // console.log("updating peak",this.peak,el.priority);
                this.peak = el.priority;
            }
            if(el.priority <= (this.isEmpty()?Number.MAX_VALUE:this.peak))
            {
                // console.log("updating tail",this.tail,el.priority);
                this.tail = el.priority;
            }
        // }
        if(!(this.arr[el.priority]))
        this.arr[el.priority]= [];
        // console.log("inserting",el,"at",el.priority);
        
        this.arr[el.priority].push(el);
        // console.log("new queue",this.arr);
        
        this.count++;

    }

    peek(): Prioritized{
        // returns the first element inserted in the bucket
        return this.arr[this.peak][0];
    }
    
    poll(): Prioritized | null{
        let prev_peak: Prioritized|null = this.arr[this.peak]?.shift()??null;
        for(let i = this.peak ; i >= 0; i--)
        {
            if(this.arr[i]?.length > 0){
                this.peak = i; 
                // console.log("new peak",this.peak);
                break;
            }
        }
        this.count--;
        return prev_peak;
    }

   isEmpty(): boolean{
    return (this.count== 0);
   } 
    

}

export default BucketQueue;