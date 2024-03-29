import React, { Dispatch, SetStateAction } from "react";
import { algo } from "./Utils/types";
import Cell from "./Cell";


const Sidebar = ({className, onVisualize, onReset, setAlgo, onClearGrid}:{className: string,onVisualize: ()=>void, onReset: ()=>void, setAlgo: Dispatch<SetStateAction<algo>> , onClearGrid: Dispatch<SetStateAction<boolean>>})=>{

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

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}} className={"p-8 h-full flex flex-col justify-between "+className}>
        <div style={{gap: "4px"}} className="flex flex-col items-start list-none " onChange={handleChange}>
            choose algorithm:
            <select name="" id="" onChange={handleChange} className={"p-2 outline-none border-2 border-yellow-400 hover:border-dashed  cursor-pointer"}>
                <option value="BFS">BFS</option>
                <option value="DFS">DFS</option>
                <option value="Dijkstra">Dijkstra</option>
                <option value="AStar">AStar</option>
            </select>
            <div className="flex space-x-2">
                <button className="btn" onClick={handleVisualize} >Visualize</button>
                <button className="btn" onClick={handleReset} >Reset</button>
            </div>
        <button className='btn' onClick={()=>onClearGrid(true)} >Clear Grid</button>
        </div>
        <div>
        <div className="h-24 mb-0 flex flex-col justify-end space-y-1">
            <div className="flex items-center "><div className="w-8 h-8 bg-blue-200 mr-4"></div> visited </div><br />
            <div className="flex items-center "><div className="w-8 h-8 bg-yellow-400 mr-4"></div> path</div>
            {/* <Cell /> visited */}
        </div>
        <div className="text-left mt-10 h-fit text-xs ">
            Made with <strong className="text-red-400">Love</strong> by<br /> <a className="text-gray-600 font-bold uppercase text-sm hover:text-red-400 " target={"_blank"} href="https://linktr.ee/mehdi.hali" >Mehdi Ouled-Hali</a>

        </div>
        </div>
    </div>
}

export default Sidebar;