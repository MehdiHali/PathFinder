import './App.css';
import Header from './Header';
import Grid from './Grid';
import Sidebar from './Sidebar';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { action, algo } from './Utils/types';
import Modal from './Modal';
import ToolBox from './Utils/ToolBox';


import Logo from './Components/Logo';
import Eraser from './assets/eraser.png'
import Home from './assets/home.png'
import Location from './assets/Location.png'
import MyLocation from './assets/MyLocation.png'
import { Vertex } from './Utils/useGraph';
import BucketQueue from './Utils/BucketQueue';


function App() {

    const [visualize, setVisualize]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [resetGrid, setResetGrid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [clearGrid, setClearGrid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    let [action,setAction]: [action: action,setAction: Dispatch<SetStateAction<action>>] = useState("WALL" as action);
    let [algo,setAlgo]: [action: algo,setAction: Dispatch<SetStateAction<algo>>] = useState("BFS" as algo);
    let [showHelp,setSHowHelp] = useState(true);

    useEffect(()=>{

      let pq: BucketQueue = new BucketQueue();
      pq.insert(new Vertex(0,10,undefined,undefined,undefined,undefined,1));
      pq.insert(new Vertex(1,2,undefined,undefined,undefined,undefined,1));
      pq.insert(new Vertex(5,9,undefined,undefined,undefined,undefined,0));

      
      console.log("peek:",pq.peek());
      console.log("poll:",pq.poll());
      console.log("peek:",pq.peek()); 
      console.log("poll:",pq.poll());
      console.log("poll:",pq.poll());
      console.log("poll:",pq.poll());

    },[])

    // useEffect(()=>{
    //   setTimeout(()=>{
    //     setSHowHelp(false);
    //   },2000)
    // },[])
 
    useEffect(()=>{
      // push(stack,count);
    },[visualize])



  return (
    <div className="App h-screen min-h-screen">
      {
        showHelp &&
      <Modal className=" border-8 border-orange-400  ">
        <button className='absolute top-0 right-0 p-2 w-10 hover:bg-gray-200' onClick={()=>setSHowHelp(false)}>X</button>
        <h2 className='text-blue-400 font-black text-2xl'>How it works ?</h2>
        <div className='flex flex-col items-center space-y-8'>
            <p className='py-8'>think of the grid like a <b> map</b> you can use the tools in the toolbox of the header to create or delete <b>buildings</b> and change the <b> start</b> and <b> goal</b> vertex
            <br /> use this tools to draw things on the map (grid)
            </p>
        <ToolBox<action> onChange={setAction} defaultValue={"WALL"} className=" mx-auto ">
            <ToolBox.Tool name="wall"  /*onClick={setAction}*/ selected = {true} value={"WALL"}>
                <img src={Home} />
            </ToolBox.Tool>
            <ToolBox.Tool name="eraser" selected={false} value={"ROUTE"}>
                <img src={Eraser} />
            </ToolBox.Tool>
            <ToolBox.Tool name="start" selected={false} value={"START"}>
                <img src={Location} />
            </ToolBox.Tool>
            <ToolBox.Tool name="goal" selected={false} value={"GOAL"}>
                <img src={MyLocation} />
            </ToolBox.Tool>
        </ToolBox> 
        </div>
      </Modal>
      }
     <Header setShowHelp={setSHowHelp} setAction={setAction} visualize={visualize} className={"h-[10%] bg-primary"}/>
     <div className='flex h-[90vh] '>
      <Sidebar onClearGrid={setClearGrid}  setAlgo={setAlgo} onVisualize={()=>!visualize&&setVisualize(true)} onReset={()=>setResetGrid(true)} className={" w-[20%] bg-primary hidden sm:block"} />
      <Grid algo={algo} triggerResetGrid={resetGrid} setResetGrid={setResetGrid} clearGrid={clearGrid} setClearGrid={setClearGrid} action={action} visualize={visualize} setVisualize={setVisualize}  className={"w-full bg-gray-100 h-full"}/>
     </div>
    </div>
  );
}

export default App;
