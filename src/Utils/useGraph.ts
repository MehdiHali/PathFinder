import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Set } from "typescript";
// import {useStack, Stack} from './useStack';



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
    walls: Vertex[];
}

/**
 * @NEXT maybe keep track of the walls in a state
 * so that i can reset the grid 
 * 
 */

/**
 * @getVertex when you want to fetch a vertex an keeping the same reference 
 * use the @numVertices and @numEdges to trigger the rerenders
 * @CAUTION : if you add and remove an edge at the same time this won't change numEdges
 * and therefore won't trigger the rerender
 * @setToArray use this to get the array of vertices from the @verticesSet
 * @listHas use this method to test the existence of avertex in the adjList
 * @removeEdge just take a list and remove the edge without setting state or rerendering
 * @IMPORTANT When ever you modify the adjacency list make sure 
 * you are not messing up the neighbors order
 */

function useGraph(cols?: number,rows?: number){
    const [graph,setGraph]: [graph: Graph, setGraph: Dispatch<React.SetStateAction<Graph>>]= useState(
        {
        numVertices: 0,
        numEdges: 0,
        AdjList: new Map<Vertex,Array<Vertex>>,
        verticesSet: new Set<Vertex>(),
        walls: [] as Vertex[]
        } as Graph
    );

    let [graphLoaded, setGraphLoaded]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

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

    /** 
     * every time you want to keep the same reference to the vertex 
     * use this function to fetch it
     * */ 
    function getVertex(graph: Graph, target: Vertex){
        let found = {} as Vertex;
        graph.verticesSet.forEach(v=>{
            if(v.col==target.col&&v.row==target.row){
                found = v;
                // console.log("GET VERTEX::: found the vertex",found);
                
            }
        })
        return found;
    }

    function createGraphFromDimension(cols: number, rows: number){
        let newAdjList = new Map<Vertex,Vertex[]>;
        let numEdges = 0;
        let numVertices = cols*rows;
        let verticesSet = new Set<Vertex>;
        let walls = [] as Vertex[];

        let newGraph: Graph = {
            AdjList: newAdjList,
             numEdges: numEdges,
              numVertices: numVertices,
              verticesSet: verticesSet,
              walls: walls,
            }
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
                    // console.log("CREATING GRAPH::: pushing neighbor", getVertex(graph,{row: v.row-1, col:v.col} as Vertex));
                    
                    neighbors.push(getVertex(newGraph,{row: v.row-1, col:v.col} as Vertex)); 
                    numEdges++;
                }
                if(v.col > 0){
                    neighbors.push(getVertex(newGraph,{row: v.row, col:v.col-1} as Vertex)); 
                    numEdges++;
                }
                if(v.row < rows-1){
                    neighbors.push(getVertex(newGraph,{row: v.row+1, col:v.col} as Vertex)); 
                    numEdges++;
                }
                if(v.col < cols-1){
                    // console.log(v.col,"less than",cols-1);
                    
                    neighbors.push(getVertex(newGraph,{row: v.row, col:v.col+1} as Vertex)); 
                    numEdges++;
                }

                newAdjList.set(v,neighbors);
                
        })
        
        setGraph(newGraph);
        setGraphLoaded(true);
    }

    // remove the edge from the list without triggering rerender
    function removeEdge(adjList: Map<Vertex,Vertex[]>,from: Vertex, to: Vertex){
        from = getVertex(graph,from);
        console.log("removing edge from",from,"to",to);
        
        console.log("from nei",getNeighbors(graph,from),'to nei',adjList.get(to));
        
        
        if(adjList.has(from)) {
            console.log("from and to keys exist");
            
            let newNeighbors: Vertex[]  = [...(getNeighbors(graph,from).filter((n)=>{

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
                removeEdge(newAdjList,getVertex(graph,n) ,v);
                removedEdgesCount++;
            })

            // removing the edges of the wall
            removedEdgesCount = removedEdgesCount + (newAdjList.get(v)?.length??0);
            newAdjList.set(v,[]);

            

            console.log("old num of edges",graph.numEdges);
            console.log("num of removed edges",removedEdgesCount);
            

            // switching isWall on
            getVertex(graph,v).isWall = true;

            // - even though we are mutating the same adjList
            // the decrease in the number of edges will trigger the setState rerender
            // - even tough we are calling the setGraph every time, React will batch those 
            // setStates into one to increase performance
            setGraph(graph=>({...graph,numEdges:graph.numEdges-removedEdgesCount,AdjList: newAdjList,walls: [...graph.walls,v]}));
    }

    /**
     * Converts a wall to route vertex
     */
    function makeRoute(v: Vertex){
        if(!v.isWall) return;
        console.log("USEGRAPH::: making ",v,"a route");
        
        let newAdjList = new Map(graph.AdjList);
        v.isWall = false;
        let neighbors: Vertex[] = getNeighborsInOrder(v);
        let edgesCount:number = neighbors.length;
        
        console.log(v," neighbors are",neighbors);
            
        // making the vertex neighbor to its neighbors
        neighbors.forEach(n=>{
            if(!newAdjList.get(n)?.includes(v)){
                // IMPORTANT
                // WE MUST INSERT THE NEIGHBORS IN ORDERS
                // BECAUSE IF WE JUST PUSHED THE VERTEX
                // WE WILL MESS THE ORDER
                let nNeighbors = getNeighborsInOrder(n);
                newAdjList.set(n,nNeighbors);
            }
            // newAdjList.get(n)?.push(v);
        })

        // fillign the neighbors of the vertex
        newAdjList.set(v,neighbors);
        console.log("USEGRAPH::: new ADJList",newAdjList);

        let newWalls: Vertex[] = graph.walls.filter(w=>w!=v);
        setGraph(graph=>({...graph,numEdges: graph.numEdges+edgesCount, AdjList: newAdjList, walls: newWalls}))
        }
        

    /**
     * for consistency, we need to always get the neighbors
     * and set them in the same order 
     * @param v : Vertex
     * @returns Vertex[]
     */
    function getNeighborsInOrder(v: Vertex): Vertex[]{

        let neighbors: Vertex[] = [];
        if(cols != undefined && rows != undefined){
            if(v.row >0 ){
                neighbors.push(getVertex(graph,{row: v.row-1, col: v.col} as Vertex));
            }
            if(v.col > 0){
                neighbors.push(getVertex(graph,{row: v.row, col: v.col-1} as Vertex));
            }
            if(v.row < rows-1){
                neighbors.push(getVertex(graph,{row: v.row+1, col: v.col} as Vertex));
            }
            if(v.col < cols-1){
                neighbors.push(getVertex(graph,{row: v.row, col: v.col+1} as Vertex));
            }
    }
    return neighbors;
    }

    function resetGraph(){
        console.log("USEGRAPH::: Resetting the grid");
        console.log("USEGRAPH::: Current walls", graph.walls);
        if(cols!= undefined && rows != undefined)
        createGraphFromDimension(cols,rows); 
        // graph.walls.forEach(w=>{
        //     makeRoute(w);
        // })
    }

    // if a dimension is provided then create a graph from that dimension
    useEffect(()=>{
        if(cols != undefined && rows != undefined && cols > 0 && rows > 0)
        createGraphFromDimension(cols,rows);
    },[])

    // logging the graph changes
    useEffect(()=>{
        console.log("USEGRAPH::: After setting the graph -=-=-=-=-=-=");

        // let trueNUmEdges = 0;
        // graph.AdjList.forEach((n,v)=>{
        //     trueNUmEdges += n.length;
        //     if(n.length<30) console.log("(*****) ",v," has nei",n)
            
        // })
        // console.log("***the true number of edges : ",trueNUmEdges);
        
        
        console.log("USEGRAPH::: new graph ",graph);
        
        // console.log(listHas({row: 0,col: 0,isWall}));
        // console.log(getNeighbors(graph,{row: 0,col:1} as Vertex) );
        // console.log(getNeighbors(graph,{row: 1,col:0} as Vertex) );
    },[graph])


    return {graph: graph,graphLoaded, createGraphFromDimension, makeWall, makeRoute, resetGraph};
}

// ============== Helper Fnuctions =============

    function setToArray(set: Set<Vertex>): Vertex[]{
        let vertices: Vertex[] = [];
        set.forEach((v)=>{
            vertices.push(v);
        })
        return vertices
    }


    function getNeighbors(graph: Graph,v: Vertex): Vertex[]{
        let neighbors: Vertex[] = [];
        // getting the vertex with same reference
        v = getVertex(graph, v);

        if(graph.AdjList.get(v) != undefined)
        neighbors = graph.AdjList.get(v)??[];
        else {
            console.log("GET NEIGHBORS::: there is no neighbors for ",v);
            
        }
        console.log("GET NEIGHBORS::: vertex is", v, "neighbors are",neighbors )
        return neighbors;
    }


    /** 
     * every time you want to keep the same reference to the vertex 
     * use this function to fetch it
     * */ 
    function getVertex(graph: Graph, target: Vertex){
        let found = {} as Vertex;
        graph.verticesSet.forEach(v=>{
            if(v.col==target.col&&v.row==target.row){
                found = v;
                console.log("GET VERTEX::: found the vertex",found);
                
            }
        })
        return found;
    }

    function listHas(list: Map<Vertex,Vertex[]>,v: Vertex): boolean{
        let found = false;
        console.log("searching key",v);
        list.forEach((n,key)=>{
            if(key.col == v.col && key.row == v.row){
                console.log("key found", key);
                found= true;
            }
        })
        return found;
    }
    


export  {useGraph, getNeighbors, getVertex, listHas, setToArray, type Graph, type Vertex};