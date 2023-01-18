import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {useGraph,getVertex,Vertex, setToArray} from './Utils/useGraph'
import { DFS } from './Utils/DFS';
import { BFS } from './Utils/BFS';
import { DrawAction, action, algo } from './Utils/types';
import Cell from './Cell';


function Grid({className,algo,triggerResetGrid, setResetGrid,visualize, setVisualize,action, clearGrid, setClearGrid}: {className: string, algo: algo, triggerResetGrid: boolean, setResetGrid: Dispatch<SetStateAction<boolean>>,visualize: boolean, action: action, clearGrid: boolean,setVisualize: Dispatch<SetStateAction<boolean>>,setClearGrid: Dispatch<SetStateAction<boolean>>}){

    const COLS = 30;
    const ROWS = 15;
    const SPEED = 1;
    let {graph, makeWall, makeRoute, makeTraffic, makeVisited, setWeight, makePath,resetGraph, graphLoaded} = useGraph(COLS,ROWS);
    let [mouseDown,setMouseDown]= useState(false);
    let [searched, setSearched]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    let [path,setPath]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [visited, setVisited]: [Vertex[], Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[])
    let [DFSVisited,setDFSVisited]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [DFSPath,setDFSPath]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [start, setStart]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:5,row:4} as Vertex);
    let [goal, setGoal]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:15,row:6} as Vertex);
    
    function handleMouseEnter(v: Vertex){
        if(mouseDown) handleCellClick(v);
    }

    useEffect(()=>{
        console.log("GRID::: Graph updated", graph);
        
    },[graph])


    function triggerClearGrid(){
        console.log("GRID::: Triggering clear grid");
        
            resetGraph();
            resetGrid();
            setClearGrid(false);
    }

     /**
     * Start's the Search
     */
    useEffect(()=>{
        visualize && !searched && search();
        triggerResetGrid && searched && resetGrid();
        clearGrid && triggerClearGrid();
    });

    function search(){
        let algoImpl;
        switch(algo){
            case 'DFS': algoImpl = DFS;break;
            case 'BFS': algoImpl = BFS;break;
            default: algoImpl = DFS;break;
        }
        setSearched(true);
        // console.log("VIEW::: Searching Triggered"6;
        
        if(!graphLoaded)
            {
                // console.log("!!!!!!!!! GRAPH NOT LOADED YET !!!!!");
            }
        else 
        {
        // console.log("VIEW::: INITIAL VISITED",visited);
            
        let {DFSPath,DFSVisited} = algoImpl(
            graph,
            getVertex(graph,start),
            getVertex(graph,goal),
            );
            // console.log("VIEW::: setting THE new path", path);
            
        
            // setSearchdone(true);

            console.log("SEARCH DONE");
            console.log("DFS VISITED", DFSVisited);
            console.log("DFS PATH", DFSPath);
            
            
            setDFSVisited(DFSVisited);
            setDFSPath(DFSPath);

        }

        
    }

    /**
     * this method resets the state of the Grid and not the graph
     * the funciton responsible for the reset og the graph is @resetGraph
     */
    function resetGrid(){
        setVisited([]);
        setPath([]);
        setDFSVisited([]);
        setDFSPath([]);
        setResetGrid(false);
        setVisualize(false);
        setSearched(false);
    }

    useEffect(()=>{
        console.log("GRID::: The new visited", visited);
        console.log("GRID::: The new path", path);
        
    },[visited,path])

    /**
     * This hook is responsible for the incremental coloring
     * of the path
     */
    useEffect(()=>{
        console.log("VIEW::: The new DFSVisited", DFSVisited);
        console.log("VIEW::: The new DFSPath", DFSPath);
        
        if((DFSVisited.length > 0 )){
            let curr = DFSVisited.shift();
            // console.info("current to be colored", curr);
            
                const interval = setTimeout(
                ()=>{
                    // console.log("VIEW::: from settimeout: Setting visited", curr);
                    if(curr!=undefined)
                    {
                        // makeVisited(curr);
                        setVisited(visited=>[...visited,curr??{} as Vertex]);
                    }
                },SPEED);
                return () => clearTimeout(interval);
        }else if(DFSPath.length > 0){
            let curr = DFSPath.shift();
            // console.info("current in PATH to be colored", curr);
            
                const interval = setTimeout(
                ()=>{
                    if(curr)
                    makePath(curr)
                    // console.log("VIEW::: from settimeout: Setting path", curr);
                    if(curr!=undefined)
                    setPath(path=>[...path,curr??{} as Vertex]);
                },SPEED);
                return () => clearTimeout(interval);

        }else{
            // Her we beed to declare the end of visualization
            setVisualize(false);
        }
        
    },[DFSVisited,DFSPath,visited,path])

    function isStart(vertex: Vertex):boolean{
        return (start.col === vertex.col && start.row === vertex.row);
    }
    function isGoal(vertex: Vertex):boolean{
        return (goal.col === vertex.col && goal.row === vertex.row);
    }

    function handleCellClick(vertex: Vertex){
        switch(action){
            case DrawAction.WALL: ( !isStart(vertex) && !isGoal(vertex) ) && makeWall(vertex);break;
            case DrawAction.TRAFFIC: ( !isStart(vertex) && !isGoal(vertex) ) && makeTraffic(vertex);break;
            case DrawAction.ROUTE:  ( !isStart(vertex) && !isGoal(vertex) ) && makeRoute(vertex);break;
            case DrawAction.START: (vertex !== start)&& setStart(vertex);break;
            case DrawAction.GOAL: (vertex !== goal) && setGoal(vertex);break;
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
                setWeight={setWeight}
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