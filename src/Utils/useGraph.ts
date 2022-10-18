import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Set } from "typescript";
import {useStack, Stack} from './useStack';

/**
 * @getVertex when you want to fetch a vertex an keeping the same reference 
 * use the @numVertices and @numEdges to trigger the rerenders
 * @CAUTION : if you add and remove an edge at the same time this won't change numEdges
 * and therefore won't trigger the rerender
 * @setToArray use this to get the array of vertices from the @verticesSet
 * @listHas use this method to test the existence of avertex in the adjList
 * @removeEdge just take a list and remove the edge without setting state or rerendering
 */


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



    // function addVertex(v: Vertex){
    //     let newAdjList = graph.AdjList;
    //     newAdjList.set(v,[])
    //     setGraph(graph=>({...graph,numVertice: graph.numVertices+1,AdjList: newAdjList}))
    // }

    // function addEdge(from: Vertex, to: Vertex){
    //     let newAdjList = graph.AdjList;
    //     newAdjList.get(from)?.push(to);
    //     if(newAdjList == graph.AdjList) console.log("!!!!!!!!!!!!!!!losely compared no state change after adding edge");
        
    //     setGraph(graph=>({...graph,AdjList: newAdjList,numEdges: graph.numEdges+1}))
    // }

    function printGraph(){
        graph.AdjList.forEach((v,i)=>console.log(i,"-->",v));
    }

    function createGraphFromDimension(cols: number, rows: number){
        let newAdjList = new Map<Vertex,Vertex[]>;
        let numEdges = 0;
        let numVertices = cols*rows;
        let verticesSet = new Set<Vertex>;

        // fill the vertices set
        for(let row = 0; row<rows; row++)
            for(let col = 0; col<cols; col++)
            {
                let currVertex: Vertex = {row,col,isWall: false};
                newAdjList.set(currVertex , []);
                // addVertex(currVertex)
                verticesSet.add(currVertex);
            }

        // fill in the neighbors of each vertex
        verticesSet.forEach((v)=>{
                let neighbors: Vertex[] = [];

                if(v.row > 0){
                    neighbors.push(getVertex(verticesSet,{row: v.row-1, col:v.col} as Vertex)); 
                    numEdges++;
                }
                if(v.col > 0){
                    neighbors.push(getVertex(verticesSet,{row: v.row, col:v.col-1} as Vertex)); 
                    numEdges++;
                }
                if(v.row < rows-1){
                    neighbors.push(getVertex(verticesSet,{row: v.row+1, col:v.col} as Vertex)); 
                    numEdges++;
                }
                if(v.col < cols-1){
                    console.log(v.col,"less than",cols-1);
                    
                    neighbors.push(getVertex(verticesSet,{row: v.row, col:v.col+1} as Vertex)); 
                    numEdges++;
                }

                newAdjList.set(v,neighbors);
                
        })

        
        setGraph({AdjList: newAdjList, numEdges: numEdges, numVertices: numVertices,verticesSet: verticesSet});
    }

    // every time you want to keep the same reference to the vertex use this 
    // function to fetch it
    function getVertex(set: Set<Vertex>, target: Vertex){
        let found = {} as Vertex;
        set.forEach(v=>{if(v.col==target.col&&v.row==target.row)found = v})
        return found;
    }

    function setToArray(set: Set<Vertex>): Vertex[]{
        let vertices: Vertex[] = [];
        set.forEach((v)=>{
            vertices.push(v);
        })
        return vertices
    }

    function getNeighbors(v: Vertex): Vertex[]{
        let neighbors: Vertex[] = [];
        // getting the vertex with same reference
        v = getVertex(graph.verticesSet, v);
        return graph.AdjList.get(v)??[];
    }

    function listHas(v: Vertex): boolean{
        let found = false;
        console.log("searching key",v);
        graph.AdjList.forEach((n,key)=>{
            if(key.col == v.col && key.row == v.row){
                console.log("key found", key);
                found= true;
            }
        })
        return found;
    }

    // remove the edge from the list without triggering rerender
    function removeEdge(adjList: Map<Vertex,Vertex[]>,from: Vertex, to: Vertex){
        from = getVertex(graph.verticesSet,from);
        console.log("removing edge from",from,"to",to);
        
        console.log("from nei",getNeighbors(from),'to nei',adjList.get(to));
        
        
        if(adjList.has(from)) {
            console.log("from and to keys exist");
            
            let newNeighbors: Vertex[]  = [...(getNeighbors(from).filter((n)=>{

                let satisfy = (n.col !=to.col || n.row != to.row);
                if(satisfy) console.log(n," is not equal to the new wall ", to);
                
                return satisfy;
            }))];
            console.log("new ",from,"neighbors",newNeighbors);
            
            adjList.set(from,newNeighbors);
            console.log("this is the new adjList", adjList);
            // setGraph(graph=>({...graph,numEdges: graph.numEdges-1, AdjList: newAdjList}))
            return adjList;
        }

    }


    function makeWall(v: Vertex){
            if(v.isWall) return;
            console.log("making ",v,"Wall");
            let newAdjList: Map<Vertex,Vertex[]> = graph.AdjList;
            // let newAdjList: Map<Vertex,Vertex[]> = new Map<Vertex,Vertex[]>(graph.AdjList);
        
            console.log(v,"neibors are",newAdjList.get(v));
            
            // let newNumEdges= graph.numEdges ;
            let removedEdgesCount = 0 ;

            // removing all the edges comming to v
            newAdjList.get(v)?.forEach((n)=>{
                removeEdge(newAdjList,getVertex(graph.verticesSet,n) ,v);
                removedEdgesCount++;
            })

            // removing the edges of the wall
            removedEdgesCount = removedEdgesCount + (newAdjList.get(v)?.length??0);
            newAdjList.set(v,[]);

            

            console.log("old num of edges",graph.numEdges);
            console.log("num of removed edges",removedEdgesCount);
            

            // switching isWall on
            getVertex(graph.verticesSet,v).isWall = true;

            // - even though we are mutating the same adjList
            // the decrease in the number of edges will trigger the setState rerender
            // - even tough we are calling the setGraph every time, React will batch those 
            // setStates into one to increase performance
            setGraph(graph=>({...graph,numEdges:graph.numEdges-removedEdgesCount,AdjList: newAdjList}));
    }

    

    // if a dimension is provided then create a graph from that dimension
    useEffect(()=>{
        if(cols > 0 && rows > 0)
        createGraphFromDimension(cols,rows);
    },[])

    // logging the graph changes
    useEffect(()=>{
        console.log("After setting the graph -=-=-=-=-=-=");

        // let trueNUmEdges = 0;
        // graph.AdjList.forEach((n,v)=>{
        //     trueNUmEdges += n.length;
        //     if(n.length<30) console.log("(*****) ",v," has nei",n)
            
        // })
        // console.log("***the true number of edges : ",trueNUmEdges);
        
        
        console.log("graph",graph);
        
        // console.log(listHas({row: 0,col: 0,isWall}));
        console.log(getNeighbors({row: 0,col:1} as Vertex) );
        console.log(getNeighbors({row: 1,col:0} as Vertex) );
    },[graph])

    // function dfs(start: number, end: number){
    //     const {stack,push,pop,peak,toArray,isEmpty} = useStack();
    //     let  [visited, setVisited]: [Node[],Dispatch<SetStateAction<Node[]>>] = useState([] as Node[] );


    //     let curr = start;
    //     push(stack,curr);
    //     while(!isEmpty(stack)){

    //     }

    // }


    return {graph: graph, setToArray, createGraphFromDimension, makeWall};
}

export  {useGraph, type Graph, type Vertex};