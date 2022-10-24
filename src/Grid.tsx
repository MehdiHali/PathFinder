import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {useGraph,getVertex,Vertex, setToArray} from './Utils/useGraph'
import { DFS } from './Utils/DFS';
import { BFS } from './Utils/BFS';
import { action, algo } from './Utils/types';
import Mosque from './assets/Mosque.png'
import Castle from './assets/Castle.png'
import Location  from './assets/Location.png'
import HomePin  from './assets/HomePin.png'
import MyLocation  from './assets/MyLocation.png'
import MinHeap from './Utils/Heap';
import Queue from './Utils/Queue';


let Cell = ({vertex,path, start, goal,visited,action, onClick, onMouseUp,onMouseEnter,onMouseDown}: {vertex: Vertex,path: Vertex[], start: Vertex, goal: Vertex,action: action, visited: Vertex[],onClick: ()=>void, onMouseUp:()=>void, onMouseEnter: ()=>void, onMouseDown: ()=>void }): JSX.Element=>{

    let isVisited = visited.includes(vertex);
    useEffect(()=>{
        // console.log("isVisited", isVisited);
        
    },[])

    let isPath = path.includes(vertex);
    let isStart: boolean = (vertex.col === start.col && vertex.row === start.row);
    let isGoal =  (vertex.col === goal.col && vertex.row === goal.row);



    return <>
        <span 
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter} 
        onMouseUp={()=>{console.log("Mouse is Up");onMouseUp()}} 
        onClick={()=>{console.log("making",vertex,action); onClick()}} 
        className={" select-none grid content-center object-cover text-xs relative hover:scale-125 hover:border-yellow-400  border border-blue-400 overflow-hidden "+ (vertex.isWall?" border-slate-500":isStart?" border-green-400":isGoal?" border-red-400":isPath?" bg-yellow-400":isVisited?" bg-blue-200":"") } >
            {/* <p  className=' select-none  '>
                {vertex.row.toString()+","+vertex.col.toString()}
            </p>  */}
            <div className={"w-full h-4 mx-auto grid content-center"}>

                    { 
                    vertex.isWall ? <img className='w-6  mx-auto object-cover' src={Castle} />
                    :isStart ? <img className='  mx-auto object-cover' src={MyLocation} />
                    :isGoal ? <img className='  mx-auto object-cover' src={HomePin} />
                    : ""
                    }
            </div>
        </span>
    </>

}


function Grid({className,algo,triggerResetGrid, setResetGrid,visualize, setVisualize,action, clearGrid, setClearGrid}: {className: string, algo: algo, triggerResetGrid: boolean, setResetGrid: Dispatch<SetStateAction<boolean>>,visualize: boolean, action: action, clearGrid: boolean,setVisualize: Dispatch<SetStateAction<boolean>>,setClearGrid: Dispatch<SetStateAction<boolean>>}){

    const COLS = 30;
    const ROWS = 15;
    const SPEED = 1;
    let {graph, makeWall, makeRoute, makeVisited, makePath,resetGraph, graphLoaded} = useGraph(COLS,ROWS);
    let [mouseDown,setMouseDown]= useState(false);
    let [searched, setSearched]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    let [stop, setStop]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
    let [path,setPath]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [visited, setVisited]: [Vertex[], Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[])
    let [DFSVisited,setDFSVisited]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [DFSPath,setDFSPath]: [Vertex[],Dispatch<SetStateAction<Vertex[]>>] = useState([] as Vertex[]);
    let [start, setStart]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:0,row:0} as Vertex);
    let [goal, setGoal]: [Vertex,Dispatch<SetStateAction<Vertex>>] = useState({col:18,row:9} as Vertex);
    // let [heap, setHeap]: [MinHeap<number>, Dispatch<SetStateAction<MinHeap<number>>>] = useState(new MinHeap());
    // let [queue, setQueue]: [Queue<number>, Dispatch<SetStateAction<Queue<number>>>] = useState(new Queue());
    
    function handleMouseEnter(v: Vertex){
        if(mouseDown) handleCellClick(v);
    }

    // useEffect(()=>{
    //     let newQueue = new Queue<number>();
    //     newQueue.push(1);
    //     newQueue.push(2);
    //     newQueue.push(3);
    //     setQueue(newQueue);
    // },[])

    // useEffect(()=>{
    //     console.log("GRID::: the new Queue", queue);
        
    //     if(queue.length > 0){
    //         let newQueue = new Queue<number>(queue);
    //         console.log("GRID::: Polling from queue", newQueue.poll());
    //         console.log("GRID::: new length of queue", newQueue.length);
            
    //         setQueue(newQueue);
    //     }
    // },[queue])

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
        
            resetGraph();
            resetGrid();
            setClearGrid(false);
    }

    // useEffect(()=>{
    //     let newHeap = new MinHeap(heap);
    //     newHeap.insert(1);
    //     console.log("GRID::: after inserting",newHeap);
    //     newHeap.insert(2);
    //     console.log("GRID::: after inserting ",newHeap);
    //     newHeap.insert(3);
    //     console.log("GRID::: after inserting",newHeap);
    //     newHeap.insert(4);
    //     console.log("GRID::: after inserting",newHeap);

    //     setHeap(newHeap);
    // },[])


    // useEffect(()=>{
    //     console.log("GRID::: current heap ",heap);
    //     if(heap.length > 0){
    //         let newHeap = new MinHeap(heap);
    //         console.log("GRID::: heap length before removing", newHeap.length);
            
    //         console.log("GRID::: removed element from the heap is", newHeap.removePeek());
    //         setHeap(newHeap);
            
    //     }
        
    // },[heap])

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
        // console.log("VIEW::: Searching Triggered");
        
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
        setStop(true);
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