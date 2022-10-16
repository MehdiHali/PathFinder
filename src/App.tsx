import './App.css';
import Header from './Header';
import View from './View';
import Sidebar from './Sidebar';
import Stack from './Utils/Stack';
import { ReactNode, useEffect, useState } from 'react';
import { setConstantValue } from 'typescript';
import {useStack} from './Utils/useStack'
// import {useGraph} from './Utils/useGraph'

function App() {

    let [count, setCount] = useState(0);

    let {stack,push,pop,peak,isEmpty,getSize,toArray} = useStack();
    // let {graph,getVertices, createGraphFromDimension} = useGraph();
    // useEffect(()=>{
    //   createGraphFromDimension(5,5);
    // },[])
    // let vertices = graph.AdjList.entries();

    // useEffect(()=>{
    //   console.log("adjList ", graph.AdjList);
    //   console.log("Entries ",graph.AdjList.entries());
    //   console.log("Keys ",graph.AdjList.keys());
    // },[graph])
    
    useEffect(()=>{

    },[])
 
    useEffect(()=>{
      push(stack,count);
    },[count])

    // function push(n: number){
    //   setStack((stack): Stack=>{
    //     console.log("pushing");
    //     stack.push(n);
    //     let newStack = new Stack();
    //     return stack;
    //   });
    // }

    // function pop(){
    //   setStack((stack): Stack=>{
    //     console.log(stack.pop()??"empty"); 
    //     setCount(count=>count-1);
    //     return stack;
    //   });
    // }

  return (
    <div className="App h-screen min-h-screen">
     <Header className={"h-[10%] bg-primary"}/>
     <div className='flex h-[90vh] '>
      <Sidebar className={"w-[20%] bg-primary hidden sm:block"} />
      <div>
        aldsjsf
        {peak(stack)?.val.toString()}
      <button onClick={()=>setCount((count)=>count+1)} className='p-4 bg-gray-400'>+++</button>
      <button onClick={()=>pop(stack)} className='p-4 bg-gray-200'>---</button>
      </div>
      <View stackArr={toArray(stack)} className={"w-full bg-gray-800 h-full"}/>
     </div>
    </div>
  );
}

export default App;
