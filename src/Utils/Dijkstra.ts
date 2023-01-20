import BucketQueue from "./BucketQueue";
import { Graph, Vertex, getNeighbors } from "./useGraph";

function Dijkstra(graph: Graph,start: Vertex, goal: Vertex){


    if(!graph.verticesSet.has(start) || !graph.verticesSet.has(goal))
    {
        return {};
    }

    let pq: BucketQueue = new BucketQueue(); 
    let parentMap: Map<Vertex,Vertex> = new Map();
    let path: Vertex[] = [];
    let visited: Vertex[] = [];


    pq.insert(start);
    let found: boolean = false;

    while(!pq.isEmpty() && !found){
        let curr: Vertex = pq.poll() as Vertex;
        // visited.push(curr);
        
        if(curr.equals(goal)){
            found = true;
            break;
        }
        else{
            getNeighbors(graph,curr).forEach(neighbor=>{
                if(!visited.includes(neighbor)){
                    pq.insert(neighbor);
                    visited.push(neighbor);
                    parentMap.set(neighbor,curr);
                }
            })
        }
    }

    if(found){
        let curr: Vertex = goal;
        while(curr && !curr.equals(start)){
            path.push(curr);

            // telling typescript I KNOW MORE THAN YOU KNOW
            curr = parentMap.get(curr) as Vertex;
        }
        path.push(start);
    }

    return {path,visited}
}

export default Dijkstra;

