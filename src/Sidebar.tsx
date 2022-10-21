import React from "react";


const Sidebar = ({className, onVisualize, onReset}:{className: string,onVisualize: ()=>void, onReset: ()=>void})=>{

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

    return <div className={" "+className}>
        <form style={{gap: "4px"}} className="flex flex-col items-start list-none p-8">
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>DFS</label> </li>
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>BFS</label> </li>
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>Dijkstra</label> </li>
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>A*</label> </li>
            <button className="btn" onClick={handleVisualize} >Visualize</button>
            <button className="btn" onClick={handleReset} >Reset</button>
        </form>
    </div>
}

export default Sidebar;