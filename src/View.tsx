import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import {useGraph, Vertex} from './Utils/useGraph'


let Cell = ({vertex, onClick, onMouseUp,onMouseEnter,onMouseDown}: {vertex: Vertex,onClick: ()=>void, onMouseUp:()=>void, onMouseEnter: ()=>void, onMouseDown: ()=>void }): JSX.Element=>{

    return <>
        <span 
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter} 
        onMouseUp={()=>{console.log("Mouse is Up");onMouseUp()}} 
        onClick={()=>{console.log("making",vertex,"wall"); onClick()}} 
        className={"hover:scale-125 hover:border-yellow-400 w-full h-full p-2 border border-gray-500 overflow-hidden " +(vertex.isWall?"bg-slate-500":"") /*+vertex.isWall?"bg-slate-500":""*/}></span>
    </>

}

let  View = ({className}:{className: string})=>{

    let {graph, setToArray, makeWall} = useGraph(30,15);
    let [mouseDown,setMouseDown]= useState(false);
    
    function handleMouseEnter(v: Vertex){
        if(mouseDown) makeWall(v);
    }



    let start: number;
    let end: number;
    return <div className={"p-4 "+className}>
    <div className='grid grid-cols-30 w-full h-full '>
        {
            // creating a cell for every vertex in the graph
            setToArray(graph.verticesSet).map((v,i)=>{
                // calculating creating graph time
                // if(i==0) start = new Date().getTime();                
                // if(i==graph.numVertices-1){
                //     let end = new Date().getTime();
                //     console.log("time ",end-start,"ms");
                // }
                return <Cell key={i} vertex={v} 
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