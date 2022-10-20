import React, { Dispatch, ReactElement, ReactNode, SetStateAction, useEffect, useState } from 'react';
import Stack from './Utils/Stack';
import {useGraph,getVertex, getNeighbors,Vertex, setToArray} from './Utils/useGraph'
import { DFS } from './Utils/DFS';


let Cell = ({vertex,path,visited, onClick, onMouseUp,onMouseEnter,onMouseDown}: {vertex: Vertex,path: Vertex[], visited: Vertex[],onClick: ()=>void, onMouseUp:()=>void, onMouseEnter: ()=>void, onMouseDown: ()=>void }): JSX.Element=>{

    let isVisited = visited.includes(vertex);
    useEffect(()=>{
        console.log("isVisited", isVisited);
        
    },[])

    return <>
        <span 
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter} 
        onMouseUp={()=>{console.log("Mouse is Up");onMouseUp()}} 
        onClick={()=>{console.log("making",vertex,"wall"); onClick()}} 
        className={"text-xs relative hover:scale-125 hover:border-yellow-400 w-full h-full p-2 border  border-gray-500 overflow-hidden "+ (vertex.isWall?" bg-slate-500":" ")+" "+ (isVisited?" bg-violet-500":"" ) } >
            {/* <p  className=' select-none  '>
                {vertex.row.toString()+","+vertex.col.toString()}
            </p>  */}
        </span>
    </>

}

let  View = ({className}:{className: string})=>{

    let cols = 30;
    let rows = 15;
    let {graph, makeWall, graphLoaded} = useGraph(cols,rows);
    let [mouseDown,setMouseDown]= useState(false);
    let [searchDone, setSearchdone]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    let [path,setPath]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [visited, setVisited]: [Vertex[], Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[])
    let [DFSVisited,setDFSVisited]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [start, setStart]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:0,row:0} as Vertex);
    let [goal, setGoal]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:18,row:9} as Vertex);
    
    function handleMouseEnter(v: Vertex){
        if(mouseDown) makeWall(v);
    }

    useEffect(()=>{
            let interval: any;
        if(graphLoaded && !searchDone)
        {

        console.log("VIEW::: INITIAL VISITED",visited);
            
        let {DFSPath,DFSVisited} = DFS(
            graph,
            getVertex(graph,start),
            getVertex(graph,goal),
            );
            console.log("VIEW::: setting THE new path", path);
            
        
            setSearchdone(true);

            setDFSVisited(DFSVisited);

        }

        
    },[graph])

    useEffect(()=>{
        console.log("VIEW::: The new visited", visited);
        
        if((DFSVisited.length > 0)){
            let curr = DFSVisited.shift();
            console.info("current to be colored", curr);
            
                const interval = setTimeout(
                ()=>{
                    console.log("VIEW::: from settimeout: Setting", curr);
                    if(curr!=undefined)
                    setVisited(visited=>[...visited,curr??{} as Vertex]);
                },10);
                return () => clearTimeout(interval);
        }
        
    },[DFSVisited,visited])

    return <div className={"p-4 "+className}>
    <div style={{gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`}} className='grid grid-cols-30 w-full h-full '>
        {
            // creating a cell for every vertex in the graph
            setToArray(graph.verticesSet).map((v,i)=>{
                return <Cell key={i} 
                path={path} 
                visited={visited} 
                vertex={v} 
                onMouseDown={()=>{setMouseDown(true)}} 
                onClick={()=>{makeWall(v)}} 
                onMouseUp={()=>{setMouseDown(false)}} 
                onMouseEnter={()=>{handleMouseEnter(v)}} />
            })
        }

    </div>
    </div>
}

export default View;