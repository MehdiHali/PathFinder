import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {useStack, Stack} from './useStack';


interface Vertex {
    col: number,
    row: number,
    isWall: boolean
}

interface Graph {
    numVertices: number ;
    numEdges: number ;
    AdjList: Map<Vertex,Array<Vertex>> ;
    verticesSet: Set<Vertex>;
}


function useGraph(cols: number,rows: number){
    const [graph,setGraph]: [graph: Graph, setGraph: Dispatch<React.SetStateAction<Graph>>]= useState(
        {
        numVertices: 0,
        numEdges: 0,
        AdjList: new Map<Vertex,Array<Vertex>>,
        verticesSet: new Set<Vertex>()
        } as Graph
    );

    // const [numVertices, setNumVertices]: [number,Dispatch<SetStateAction<number>>] = useState(0);
    // const [numEdges, setNumEdges]: [number,Dispatch<SetStateAction<number>>] = useState(0);
    // const [adjList, setAdjList]: [Map<Vertex,Vertex[]>,Dispatch<SetStateAction<Map<Vertex,Vertex[]>>>] = useState(new Map<Vertex,Vertex[]>);


    useEffect(()=>{
        createGraphFromDimension(cols,rows);
    },[])

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
        let verticesSet = new Set<Vertex>;
        // fill the vertices set
        for(let row = 0; row<cols; row++)
            for(let col = 0; col<rows; col++)
            {

                let currVertex: Vertex = {row,col,isWall: false};
                newAdjList.set(currVertex , []);
                verticesSet.add(currVertex);
                
            }
        verticesSet.forEach((v)=>{
                let neighbors: Vertex[] = [];
                if(v.row > 0){
                    neighbors.push(getVertex(verticesSet,{row: v.row-1,col:v.col} as Vertex)); 
                    numEdges++;
                }
                if(v.col > 0){
                    neighbors.push(getVertex(verticesSet,{row: v.row,col:v.col-1} as Vertex)); 
                    numEdges++;
                }
                if(v.row < rows){
                    neighbors.push(getVertex(verticesSet,{row: v.row+1,col:v.col} as Vertex)); 
                    numEdges++;
                }
                if(v.row < cols){
                    neighbors.push(getVertex(verticesSet,{row: v.row,col:v.col+1} as Vertex)); 
                    numEdges++;
                }

                newAdjList.set(v,neighbors);
                
        })

        
        setGraph({AdjList: newAdjList, numEdges: numEdges, numVertices: numVertices,verticesSet: verticesSet});
    }

    function getVertex(set: Set<Vertex>, target: Vertex){
        let found = {} as Vertex;
        set.forEach(v=>{if(v.col==target.col&&v.row==target.row)found = v})
        return found;
    }

    function getVertices(graph: Graph): Vertex[]{
        let vertices: Vertex[] = [];
        graph.AdjList.forEach((n,v)=>{
            vertices.push(v);
        })
        return vertices
    }

    function getNeighbors(v: Vertex): Vertex[]{
        let neighbors: Vertex[] = [];
        graph.AdjList.forEach((n,key)=>{
            if(key.col == v.col && key.row==v.row) neighbors = n;
        })
        return neighbors;
    }

    function listHas(v: Vertex): Vertex{
        let found = {} as Vertex;
                console.log("searching key",v);
        graph.AdjList.forEach((n,key)=>{
            if(key.col == v.col && key.row == v.row){
                console.log("key found", key);
                found= key;
            }
        })
        return found;
    }

    function removeEdge(adjList: Map<Vertex,Vertex[]>,from: Vertex, to: Vertex){
        from = listHas(from);
        console.log("removing edge from",from,"to",to);
        
        console.log("from nei",getNeighbors(from),'to nei',adjList.get(to));
        
        
        if(adjList.has(from)) {
            console.log("from and to keys exist");
            
            let newNeighbors: Vertex[]  = [...(getNeighbors(from).filter((n)=>{

                let satisfy = (n.col !=to.col || n.row != to.row);
                if(satisfy) console.log(n," satisfy", to);
                
                return satisfy;
            }))];
            console.log("new ",from,"neighbors",newNeighbors);
            
            adjList.set(from,newNeighbors);
            console.log("this is the new adjList", adjList);
            // setGraph(graph=>({...graph,numEdges: graph.numEdges-1, AdjList: newAdjList}))
            return adjList;
        }

    }

    useEffect(()=>{
        console.log("After setting the graph -=-=-=-=-=-=");
        
        // console.log(listHas({row: 0,col: 0,isWall}));
        console.log(getNeighbors({row: 0,col:1} as Vertex) );
        console.log(getNeighbors({row: 1,col:0} as Vertex) );
    },[graph])

    function makeWall(v: Vertex){
            if(v.isWall) return;
            console.log("making ",v,"Wall");
            let newAdjList: Map<Vertex,Vertex[]> = new Map<Vertex,Vertex[]>(graph.AdjList);
        
            console.log(v,"neibors are",newAdjList.get(v));
            
            let newNumEdges= graph.numEdges;

            // removing all the edges comming to v
            newAdjList.get(v)?.forEach((n)=>{
                removeEdge(newAdjList,getVertex(graph.verticesSet,n) ,v)
                newNumEdges--;
            })

            // switching isWall on
            getVertex(graph.verticesSet,v).isWall = true;
            setGraph(graph=>({...graph,numEdges:newNumEdges,AdjList: newAdjList}))
    }

    

    // function dfs(start: number, end: number){
    //     const {stack,push,pop,peak,toArray,isEmpty} = useStack();
    //     let  [visited, setVisited]: [Node[],Dispatch<SetStateAction<Node[]>>] = useState([] as Node[] );


    //     let curr = start;
    //     push(stack,curr);
    //     while(!isEmpty(stack)){

    //     }

    // }


    return {graph: graph,getVertices, createGraphFromDimension, makeWall};
}

export  {useGraph, type Graph, type Vertex};