import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import {useGraph, Vertex} from './Utils/useGraph'


let Node = ({vertex, onClick, onMouseUp,onMouseEnter}: {vertex: Vertex,onClick: ()=>void, onMouseUp:()=>void, onMouseEnter: ()=>void }): JSX.Element=>{

    return <>
        <span 
        onMouseEnter={onMouseEnter} 
        onMouseUp={()=>{console.log("Mouse is Up");onMouseUp()}} 
        onMouseDown={()=>{console.log("making",vertex,"wall"); onClick()}} 
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
                onClick={()=>{setMouseDown(true)}} 
                onMouseUp={()=>{setMouseDown(false)}} 
                onMouseEnter={()=>{handleMouseEnter(v)}} />
            })
        }
    </div>
    </div>
}

export default View;