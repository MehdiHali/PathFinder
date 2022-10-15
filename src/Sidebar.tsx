import React from "react";


const Sidebar = ({className}:{className: string})=>{
    return <div className={" "+className}>
        <form className="flex flex-col items-start list-none p-8">
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>DFS</label> </li>
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>BFS</label> </li>
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>Dijkstra</label> </li>
            <li className=""><input name="algo" type={"radio"} className={"mr-2"}/><label>A*</label> </li>
        </form>
    </div>
}

export default Sidebar;