import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import {useGraph, Vertex} from './Utils/useGraph'


let Node = ({vertex, onClick, onMouseUp,onMouseEnter,onMouseDown}: {vertex: Vertex,onClick: ()=>void, onMouseUp:()=>void, onMouseEnter: ()=>void, onMouseDown: ()=>void }): JSX.Element=>{

    return <>
        <span 
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter} 
        onMouseUp={()=>{console.log("Mouse is Up");onMouseUp()}} 
        onClick={()=>{console.log("making",vertex,"wall"); onClick()}} 
        className={"w-full h-full p-2 border border-gray-500 overflow-hidden " +(vertex.isWall?"bg-slate-500":"") /*+vertex.isWall?"bg-slate-500":""*/}></span>
    </>

}

let  View = ({className}:{className: string})=>{

    let {graph, createGraphFromDimension, getVertices, makeWall} = useGraph(15,30);
    let [mouseDown,setMouseDown]= useState(false);
    
    function handleMouseEnter(v: Vertex){
        if(mouseDown) makeWall(v);
    }

    return <div className={"p-4 "+className}>
    <div className='grid grid-cols-30 w-full h-full '>
        {
            getVertices(graph).map((v,i)=>{
                return <Node key={i} vertex={v} 
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