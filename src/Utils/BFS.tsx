import { Graph, Vertex, getNeighbors, getVertex } from "./useGraph";

function BFS(graph: Graph, start: Vertex, goal: Vertex, onSearch?: ( params?: any)=>void): { DFSPath: Vertex[]; DFSVisited: Vertex[]; } {

    console.log("BFS::: Start");
    

    if(!graph.verticesSet.has(start) || !graph.verticesSet.has(goal))
    {
        console.log("DFS:::: start or end vertex does not exist");
        return {} as { DFSPath: Vertex[]; DFSVisited: Vertex[]; } ;
    }

    let path: Vertex[] = [];
    let parentMap: Map<Vertex,Vertex> = new Map<Vertex,Vertex>;
    let visited: Vertex[] = [];
    let queue: Vertex[] = [];

    // initialization
    parentMap.set(start,start);
    let found: boolean = false;
    // push(queue,)
    queue.push(start);

    while(queue.length > 0 && !found)
    {

        let curr: Vertex = queue.shift()??({} as Vertex);
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
                    queue.push(n);
                    parentMap.set(n,curr);
                }
            })
        }
    }

    console.log("DFS::: PARENT MAP", parentMap);
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
    queue.push(start);

    console.log("DFS::: the path is ", path);
    
    
    return {DFSPath:path, DFSVisited: visited};
}

export {BFS};

// TODO : revise node modules and search POO and write keynotes to remember wehen writing article
// attend courses and work on project when course end