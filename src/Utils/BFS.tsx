import Queue from "./Queue";
import { Graph, Vertex, getNeighbors, getVertex } from "./useGraph";

function BFS(graph: Graph, start: Vertex, goal: Vertex, onSearch?: ( params?: any)=>void): { DFSPath: Vertex[]; DFSVisited: Vertex[]; } {

    console.log("BFS::: Start");
    

    if(!graph.verticesSet.has(start) || !graph.verticesSet.has(goal))
    {
        // console.log("DFS:::: start or end vertex does not exist");
        return {} as { DFSPath: Vertex[]; DFSVisited: Vertex[]; } ;
    }

    let path: Vertex[] = [];
    let parentMap: Map<Vertex,Vertex> = new Map<Vertex,Vertex>;
    let visited: Vertex[] = [];
    let queue: Queue<Vertex> = new Queue<Vertex>();

    // initialization
    parentMap.set(start,start);
    let found: boolean = false;
    // push(queue,)
    queue.push(start);

                let visitedCount = 0;
    while(queue.length > 0 && !found)
    {

        let curr: Vertex = queue.poll()??({} as Vertex);
        // console.log("current is",curr);
        // if(onSearch != undefined)
        // onSearch(visited);
        
        if(curr.col === goal.col && curr.row === goal.row){
            // console.log("DFS::: Goal is found");
            found = true;
        }else{
            // console.log("DFS::: neighbors of current are", getNeighbors(graph,curr));
            // TODO ::: I think here is the problem
                console.log("I think here is the problem");
                // console.time("BFS::: processing neighbor");
            getNeighbors(graph,curr).forEach(n=>{ // O(n)
                if(!visited.includes(n)){ // O(n)
                    queue.push(n);
                    visited.push(n);
                    visitedCount++;
                    console.log("DFS::: visiting ",n);
                    parentMap.set(n,curr);
                }
            })
                console.log("BFS::: visitedCount ",visitedCount);
        }
    }

    // console.log("DFS::: PARENT MAP", parentMap);
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

    // console.log("DFS::: the path is ", path);
    
    
    // TODO reverse the array while filling them and not here
    return {DFSPath:path.reverse(), DFSVisited: visited.reverse()};
}

export {BFS};

// TODO : revise node modules and search POO and write keynotes to remember wehen writing article
// attend courses and work on project when course end