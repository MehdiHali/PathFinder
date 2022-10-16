import { Verify } from "crypto";
import React, { Dispatch, SetStateAction, useState } from "react";
import { getSystemErrorMap } from "util";
import {useStack, Stack} from './useStack';


interface Vertex {
    row: number,
    col: number
}

interface Graph {
    numVertices: number ;
    numEdges: number ;
    AdjList: Map<Vertex,Array<Vertex>> ;
}


function useGraph(){
    const [graph,setGraph]: [graph: Graph, setGraph: Dispatch<React.SetStateAction<Graph>>]= useState(
        {
        numVertices: 0,
        numEdges: 0,
        AdjList: new Map<Vertex,Array<Vertex>>
        } as Graph
    );

    function addVertex(v: Vertex){
        let newAdjList = graph.AdjList;
        newAdjList.set(v,[])
        setGraph(graph=>({...graph,numVertice: graph.numVertices+1,AdjList: newAdjList}))
    }

    function addEdge(from: Vertex, to: Vertex){
        let newAdjList = graph.AdjList;
        newAdjList.get(from)?.push(to);
        if(newAdjList == graph.AdjList) console.log("!!!!!!!!!!!!!!!losely compared no state change after adding edge");
        
        setGraph(graph=>({...graph,AdjList: newAdjList,numEdges: graph.numEdges+1}))
    }

    function printGraph(){
        graph.AdjList.forEach((v,i)=>console.log(i,"-->",v));
    }

    function createGraphFromDimension(cols: number, rows: number){
        let newAdjList = new Map<Vertex,Vertex[]>;
        let numEdges = 0;
        let numVertices = cols*rows;
        for(let row = 0; row<cols; row++)
            for(let col = 0; col<rows; col++)
            {
                let neighbors = [];
                if(row > 0){
                    neighbors.push({row: row-1,col}); 
                    numEdges++;
                }
                if(col > 0){
                    neighbors.push({row: row,col: col-1}); 
                    numEdges++;
                }
                if(row < rows){
                    neighbors.push({row: row+1,col}); 
                    numEdges++;
                }
                if(row < cols){
                    neighbors.push({row,col: col+1}); 
                    numEdges++;
                }
                
                newAdjList.set({row,col},neighbors);
            }
        setGraph({AdjList: newAdjList, numEdges: numEdges, numVertices: numVertices});
    }

    function getVertices(graph: Graph): Vertex[]{
        let vertices: Vertex[] = [];
        graph.AdjList.forEach((n,v)=>{
            vertices.push(v);
        })
        return vertices
    }


    // function dfs(start: number, end: number){
    //     const {stack,push,pop,peak,toArray,isEmpty} = useStack();
    //     let  [visited, setVisited]: [Node[],Dispatch<SetStateAction<Node[]>>] = useState([] as Node[] );


    //     let curr = start;
    //     push(stack,curr);
    //     while(!isEmpty(stack)){

    //     }

    // }


    return {graph: graph,getVertices, createGraphFromDimension};
}

export  {useGraph, type Graph};