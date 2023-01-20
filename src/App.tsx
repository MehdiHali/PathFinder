import './App.css';
import Header from './Header';
import Grid from './Grid';
import Sidebar from './Sidebar';
import { Dispatch,  SetStateAction, useEffect, useState } from 'react';
import { DrawAction, action, algo } from './Utils/types';
import Modal from './Modal';
import ToolBox from './Utils/ToolBox';


import Eraser from './assets/eraser.png'
import Traffic from './assets/traffic.png'
import Home from './assets/home.png'
import Location from './assets/Location.png'
import MyLocation from './assets/MyLocation.png'



function App() {

    const [visualize, setVisualize]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [resetGrid, setResetGrid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [clearGrid, setClearGrid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    let [action,setAction]: [action: action,setAction: Dispatch<SetStateAction<action>>] = useState("WALL" as action);
    let [algo,setAlgo]: [action: algo,setAction: Dispatch<SetStateAction<algo>>] = useState("BFS" as algo);
    let [showHelp,setSHowHelp] = useState(true);


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
      <Modal className=" border-8 border-orange-400 pb-0 ">
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
            <ToolBox.Tool name="traffic" selected={false} value={DrawAction.TRAFFIC}>
                <img src={Traffic} />
            </ToolBox.Tool>
        </ToolBox> 
        </div>
        <button className='bottom-0 px-4 py-2 m-2 text-center  hover:bg-gray-200' onClick={()=>setSHowHelp(false)}>{"<"}</button>
        <button className='bottom-0 px-4 py-2 m-2 text-center  hover:bg-gray-200' onClick={()=>setSHowHelp(false)}>OK</button>
        <button className='bottom-0 px-4 py-2 m-2 text-center  hover:bg-gray-200' onClick={()=>setSHowHelp(false)}>{">"}</button>
      </Modal>
      }
     <Header setShowHelp={setSHowHelp} setAction={setAction} visualize={visualize} className={"h-[10%] bg-primary"}/>
     <div className='flex h-[90vh] '>
      <Sidebar onClearGrid={setClearGrid}  setAlgo={setAlgo} onVisualize={()=>!visualize&&setVisualize(true)} onReset={()=>setResetGrid(true)} className={" w-[20%] bg-primary hidden sm:block"} />
      <Grid algo={algo} visualize={visualize} triggerResetGrid={resetGrid} setResetGrid={setResetGrid} clearGrid={clearGrid} setClearGrid={setClearGrid} action={action} setVisualize={setVisualize}  className={"w-full bg-gray-100 h-full"}/>
     </div>
    </div>
  );
}

export default App;
