
import { Module } from 'module';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface Stack{
     size: number;
     head: Node|null ;
}

interface Node{
    val: number|string;
    prev: Node|null;
}

function useStack() {
    let [stack,setStack]: [
        stack: Stack,
        setStack: Dispatch<SetStateAction<Stack>>
    ] = useState({
            size: 0,
            head: null,
        } as Stack);

    // function constructor(){
    // }

    // function createStack(){
    // }

    function getSize(stack: Stack): number{
        return stack.size;
    }

    function isEmpty(stack: Stack): boolean {
        return stack.size == 0;
    }

    function push(stack: Stack,val: number|string): void {
        let newNode: Node = {val: val, prev: null};
        let newStack: Stack = {} as Stack;
        // if stack empty we will set prev of newNode to the curr head
        if(!isEmpty(stack)){
            let currHead: Node|null = stack.head;
            newNode.prev = currHead;
            setStack(stack=>({...stack,head: newNode}))
        }
        setStack(stack=>({...stack,head: newNode, size: stack.size+1}))
    }

    function pop(stack: Stack): Node|null{
        if(isEmpty(stack)) return null;

        //  "!." is non null assertion operator
        /// we will set the head to the prev head
        setStack(stack=>({...stack, head: stack.head!.prev, size: stack.size-1}));
        // this is the curr head before the state change because setState is async
        return stack.head;
    }

    function peak(stack: Stack): Node|null{
        return stack.head;
    }

    function toArray(stack: Stack): Node[] {
        let mapArr: Array<Node> = [];
        let curr: Node|null = peak(stack);
        while(curr!=null){
            mapArr.push(curr);
            curr = curr.prev;
        }

        return mapArr;
    }

    return {stack,push,pop,peak,isEmpty,toArray,getSize}
}

export  {
    useStack,
    type Stack,
    type Node
};