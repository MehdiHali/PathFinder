import HomePin  from './assets/HomePin.png'
import Home from './assets/home.png'
import Traffic from './assets/traffic.png'
import MyLocation  from './assets/MyLocation.png'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Vertex } from './Utils/useGraph'
import { action } from './Utils/types'


let Cell = ({vertex,path, setWeight, start, goal,visited,action, onClick, onMouseUp,onMouseEnter,onMouseDown}: {vertex: Vertex,path: Vertex[], start: Vertex, goal: Vertex,action: action, visited: Vertex[],onClick: ()=>void,setWeight: (vertex: Vertex, weight: number) => void, onMouseUp:()=>void, onMouseEnter: ()=>void, onMouseDown: ()=>void }): JSX.Element=>{

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
                    vertex.isWall ? <img className='w-6  mx-auto object-cover' src={Home} />
                    :vertex.isTraffic ? <img className='w-6  mx-auto object-cover' src={Traffic} />
                    :isStart ? <img className='  mx-auto object-cover' src={HomePin} />
                    :isGoal ? <img className='  mx-auto object-cover' src={MyLocation} />
                    :""
                    // : <input type={"number"} defaultValue={0} className={"text-center w-full  h-full"}  />
                    }
            </div>
        </span>
    </>

}

export default Cell;