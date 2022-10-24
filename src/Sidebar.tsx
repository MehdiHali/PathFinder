import React, { Dispatch, SetStateAction } from "react";
import { algo } from "./Utils/types";


const Sidebar = ({className, onVisualize, onReset, setAlgo}:{className: string,onVisualize: ()=>void, onReset: ()=>void, setAlgo: Dispatch<SetStateAction<algo>>})=>{

    function handleVisualize(ev: any){
        ev.preventDefault();
        onVisualize();
        console.log("SIDEBAR::: Starting visualization");
        

    }
    function handleReset(ev: any){
        ev.preventDefault();
        onReset();
        console.log("SIDEBAR::: Stopping visualization");
    }

    function handleChange(ev: any){
        ev.preventDefault();
        setAlgo(ev.target.value);
    }

    return <div className={" "+className}>
        <div style={{gap: "4px"}} className="flex flex-col items-start list-none p-8" onChange={handleChange}>
            shoose algorithm:
            <select name="" id="" onChange={handleChange} className={"p-2 outline-none border-2 border-yellow-400 hover:border-dashed"}>
                <option value="DFS">DFS</option>
                <option value="BFS">BFS</option>
                <option value="Dijkstra">Dijkstra</option>
                <option value="AStar">AStar</option>
            </select>
            <div className="flex space-x-2">
                <button className="btn" onClick={handleVisualize} >Visualize</button>
                <button className="btn" onClick={handleReset} >Reset</button>
            </div>
        </div>
    </div>
}

export default Sidebar;