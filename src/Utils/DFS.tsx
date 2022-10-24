import { Graph, Vertex, getNeighbors, getVertex } from "./useGraph";

function DFS(graph: Graph, start: Vertex, goal: Vertex, onSearch?: ( params?: any)=>void): { DFSPath: Vertex[]; DFSVisited: Vertex[]; } {

    console.log("DFS::: Start");
    

    if(!graph.verticesSet.has(start) || !graph.verticesSet.has(goal))
    {
        console.log("DFS:::: start or end vertex does not exist");
        return {} as { DFSPath: Vertex[]; DFSVisited: Vertex[]; } ;
    }

    let path: Vertex[] = [];
    let parentMap: Map<Vertex,Vertex> = new Map<Vertex,Vertex>;
    let visited: Vertex[] = [];
    let stack: Vertex[] = [];

    // initialization
    parentMap.set(start,start);
    let found: boolean = false;
    // push(stack,)
    stack.push(start);

    while(stack.length > 0 && !found)
    {

        let curr: Vertex = stack.pop()??({} as Vertex);
        console.log("current is",curr);
        visited.push(curr);
        
        // if(onSearch != undefined)
        // onSearch(visited);
        
        if(curr.col === goal.col && curr.row === goal.row){
            console.log("DFS::: Goal is found");
            found = true;
        }else{
            console.log("DFS::: neighbors of current are", getNeighbors(graph,curr));
            
            getNeighbors(graph,curr).forEach(n=>{
                console.log("DFS::: processing neighbor", n);
                
                if(!visited.includes(n)){
                    console.log("DFS::: pushing ",n);
                    stack.push(n);
                    parentMap.set(n,curr);
                }
            })
        }
    }

    console.log("DFS::: PARENT MAP", parentMap);
    if(found){

    console.log("DFS::: Constructing path");
    let curr = goal;
    path.push(curr);
    while(curr != start && curr != undefined){
        let parent = parentMap.get(curr);
        if(parent != undefined){
            path.push(parent)
            curr = parent;
        }
    }
    stack.push(start);
    }

    console.log("DFS::: the path is ", path);
    
    
    return {DFSPath:path, DFSVisited: visited};
}

export {DFS};

// TODO : revise node modules and search POO and write keynotes to remember wehen writing article
// attend courses and work on project when course end