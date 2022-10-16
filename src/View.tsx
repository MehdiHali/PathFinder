import React, { useEffect } from 'react';
import {Stack, Node} from './Utils/useStack'
import {useGraph} from './Utils/useGraph'

let  View = ({className,stackArr}:{className: string, stackArr: Array<Node>})=>{

    console.log(stackArr);
    let {graph, createGraphFromDimension, getVertices} = useGraph();
    useEffect(()=>{
        createGraphFromDimension(5,5);
    },[])
    

    return <div className={" "+className}>View
    {
           stackArr.map((node,i)=><div key={i} className='text-white'>{node.val}</div>)
    }
        {
            getVertices(graph).map((v,i)=>{
                return <>
                    <span className='w-10 h-10 p-2 bg-red-500'>{v.row+","+v.col}</span> {(v.col == 4)&&<br />}
                </>
            })
        }

        {getVertices(graph).map((vertex,i)=>(<div key={i}><h1>{vertex.row},{vertex.col}</h1>{graph.AdjList.get(vertex)?.map((n,j)=><li key={j}>({n.row+","+n.col})</li>)}</div>))}
    </div>
}

export default View;