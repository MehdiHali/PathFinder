import './App.css';
import Header from './Header';
import Grid from './Grid';
import Sidebar from './Sidebar';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { action, algo } from './Utils/types';
import { clear } from 'console';
// import {useStack} from './Utils/useStack'
// import {useGraph} from './Utils/useGraph'

function App() {

    const [visualize, setVisualize]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [resetGrid, setResetGrid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [clearGrid, setClearGrid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    let [action,setAction]: [action: action,setAction: Dispatch<SetStateAction<action>>] = useState("WALL" as action);
    let [algo,setAlgo]: [action: algo,setAction: Dispatch<SetStateAction<algo>>] = useState("DFS" as algo);

    useEffect(()=>{

    },[])
 
    useEffect(()=>{
      // push(stack,count);
    },[visualize])

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
     <Header  onClearGrid={setClearGrid} setAction={setAction} visualize={visualize} className={"h-[10%] bg-primary"}/>
     <div className='flex h-[90vh] '>
      <Sidebar setAlgo={setAlgo} onVisualize={()=>!visualize&&setVisualize(true)} onReset={()=>setResetGrid(true)} className={" w-[20%] bg-primary hidden sm:block"} />
      <Grid algo={algo} triggerResetGrid={resetGrid} setResetGrid={setResetGrid} clearGrid={clearGrid} setClearGrid={setClearGrid} action={action} visualize={visualize} setVisualize={setVisualize}  className={"w-full bg-gray-100 h-full"}/>
     </div>
    </div>
  );
}

export default App;
