import React, { Dispatch, useState } from 'react';
import Node from './Node';

// type InjectedStackProps{

// }

type StackProps<T> = {
    // children(props: InjectedStackProps)?: ReactNode
};

type StackState<T> = {
    arr: T[];
}

class Stack<T> extends React.Component<StackProps<T>,StackState<T>> {
    
        state: StackState<T> = {
            arr : [],   
        };

        push(e: T){
            let newArr = [...this.state.arr];
            newArr.push(e);
            return this.setState(state=>({arr: newArr}));
        }
        pop(){
            let newArr = [...this.state.arr];
            newArr.pop();
            return this.setState(state=>({arr: newArr}));
        }
        length(){
            return this.state.arr.length;
        }
        peak(){
            return this.state.arr[this.length()-1];
        }
        // render():   React.ReactNode {
        //     if(this.props.children !== undefined)
        //     return this.props.children(this.state);
        //     return "";
        //   }


}

export default Stack