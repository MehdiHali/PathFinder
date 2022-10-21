import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import {useGraph,getVertex, getNeighbors,Vertex, setToArray} from './Utils/useGraph'
import { DFS } from './Utils/DFS';
import { action } from './Utils/types';


let Cell = ({vertex,path, start, goal,visited,action, onClick, onMouseUp,onMouseEnter,onMouseDown}: {vertex: Vertex,path: Vertex[], start: Vertex, goal: Vertex,action: action, visited: Vertex[],onClick: ()=>void, onMouseUp:()=>void, onMouseEnter: ()=>void, onMouseDown: ()=>void }): JSX.Element=>{

    let isVisited = visited.includes(vertex);
    useEffect(()=>{
        console.log("isVisited", isVisited);
        
    },[])

    let isPath = path.includes(vertex);
    let isStart = (vertex.col === start.col && vertex.row === start.row);
    let isGoal =  (vertex.col === goal.col && vertex.row === goal.row);



    return <>
        <span 
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter} 
        onMouseUp={()=>{console.log("Mouse is Up");onMouseUp()}} 
        onClick={()=>{console.log("making",vertex,action); onClick()}} 
        className={"text-xs relative hover:scale-125 hover:border-yellow-400 w-full h-full p-2 border border-blue-400 overflow-hidden "+ (vertex.isWall?" bg-slate-500":isStart?" bg-green-400":isGoal?" bg-red-400":isPath?" bg-yellow-400":isVisited?" bg-blue-400":"") } >
            {/* <p  className=' select-none  '>
                {vertex.row.toString()+","+vertex.col.toString()}
            </p>  */}
        </span>
    </>

}


function Grid({className,visualize,action, clearGrid, setClearGrid}: {className: string,visualize: boolean, action: action, clearGrid: boolean,setClearGrid: Dispatch<SetStateAction<boolean>>}){

    const COLS = 30;
    const ROWS = 15;
    const SPEED = 1;
    let {graph, makeWall, makeRoute,resetGrid, graphLoaded} = useGraph(COLS,ROWS);
    let [mouseDown,setMouseDown]= useState(false);
    let [searched, setSearched]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    let [stop, setStop]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
    let [path,setPath]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [visited, setVisited]: [Vertex[], Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[])
    let [DFSVisited,setDFSVisited]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [DFSPath,setDFSPath]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [start, setStart]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:0,row:0} as Vertex);
    let [goal, setGoal]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:18,row:9} as Vertex);
    
    function handleMouseEnter(v: Vertex){
        if(mouseDown) handleCellClick(v);
    }

    // useEffect(()=>{
    //         let interval: any;
    //     if(graphLoaded && !searchDone)
    //     {

    //     console.log("VIEW::: INITIAL VISITED",visited);
            
    //     let {DFSPath,DFSVisited} = DFS(
    //         graph,
    //         getVertex(graph,start),
    //         getVertex(graph,goal),
    //         );
    //         console.log("VIEW::: setting THE new path", path);
            
        
    //         setSearchdone(true);

    //         setDFSVisited(DFSVisited);

    //     }

        
    // },[graph])


    function triggerClearGrid(){
        console.log("GRID::: Triggering clear grid");
        
            resetGrid();
            setClearGrid(false);
    }

    /**
     * Start's the Search
     */
    useEffect(()=>{
        visualize && !searched && search();
        !visualize && searched && reset();
        clearGrid && triggerClearGrid();
    });

    function search(){
        setSearched(true);
        console.log("VIEW::: Searching Triggered");
        
         let interval: any;
        if(!graphLoaded)
            console.log("!!!!!!!!! GRAPH NOT LOADED YET !!!!!");
        else 
        {
        console.log("VIEW::: INITIAL VISITED",visited);
            
        let {DFSPath,DFSVisited} = DFS(
            graph,
            getVertex(graph,start),
            getVertex(graph,goal),
            );
            console.log("VIEW::: setting THE new path", path);
            
        
            // setSearchdone(true);

            setDFSVisited(DFSVisited);
            setDFSPath(DFSPath);

        }

        
    }

    function reset(){
        setStop(true);
        setVisited([]);
        setPath([]);
        setDFSVisited([]);
        setDFSPath([]);
        setSearched(false);
    }

    /**
     * This hook is responsible for the incremental coloring
     * of the path
     */
    useEffect(()=>{
        console.log("VIEW::: The new visited", visited);
        console.log("VIEW::: The new path", path);
        
        if((DFSVisited.length > 0 )){
            let curr = DFSVisited.shift();
            console.info("current to be colored", curr);
            
                const interval = setTimeout(
                ()=>{
                    console.log("VIEW::: from settimeout: Setting visited", curr);
                    if(curr!=undefined)
                    setVisited(visited=>[...visited,curr??{} as Vertex]);
                },SPEED);
                return () => clearTimeout(interval);
        }else if(DFSPath.length > 0){
            let curr = DFSPath.shift();
            console.info("current in PATH to be colored", curr);
            
                const interval = setTimeout(
                ()=>{
                    console.log("VIEW::: from settimeout: Setting path", curr);
                    if(curr!=undefined)
                    setPath(path=>[...path,curr??{} as Vertex]);
                },SPEED);
                return () => clearTimeout(interval);

        }else{
            // Her we beed to declare the end of visualization
            // setVisualize(false);
        }
        
    },[DFSVisited,DFSVisited,path,visited])

    function handleCellClick(vertex: Vertex){
        switch(action){
            case 'WALL': makeWall(vertex);break;
            case 'ROUTE': makeRoute(vertex);break;
            case 'START': setStart(vertex);break;
            case 'GOAL': setGoal(vertex);break;
        }
    }

    return <div className={"p-4 "+className}>
    <div style={{gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`}} className='grid grid-cols-30 w-full h-full gap-1 '>
        {
            // creating a cell for every vertex in the graph
            setToArray(graph.verticesSet).map((v,i)=>{
                return <Cell key={i} 
                action={action}
                goal={goal}
                start={start}
                path={path} 
                visited={visited} 
                vertex={v} 
                onMouseDown={()=>{setMouseDown(true)}} 
                onClick={()=>{handleCellClick(v)}} 
                onMouseUp={()=>{setMouseDown(false)}} 
                onMouseEnter={()=>{handleMouseEnter(v)}} />
            })
        }

    </div>
    </div>
}

export default Grid;