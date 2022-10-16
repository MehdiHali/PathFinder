
import { Module } from 'module';
import { freemem } from 'os';
import React from 'react';
import Node from './Node';
class Stack {
    private size: number = 0;
    private head: Node|null = null;
    private tail: Node |null = null;

    constructor(){
    }

    createStack(){
        return this.head;
    }

    getSize(): number{
        return this.size;
    }

    isEmpty(): boolean {
        return this.size == 0;
    }

    push(val: number|string): void {
        let newNode: Node = new Node(val);
        if(this.isEmpty()) this.tail = newNode; 
        else {
            let tmp: Node|null = this.tail;
            newNode.setPrev(tmp as Node);
            this.tail = newNode;
        }
        this.size++;
    }

    pop(): Node|null{
        if(this.isEmpty()) return null;
        let last = this.tail;
        //  non null assertion operator
        this.tail = this.tail!.getPrev();
        this.size--;
        return last;
    }
    peak(): Node|null{
        return this.tail;
    }

    toArray(): Node[] {
        let mapArr: Array<Node> = [];
        let curr: Node|null = this.peak();
        while(curr!=null){
            mapArr.push(curr);
            curr = curr.getPrev();
        }

        return mapArr;
    }

}

export default Stack