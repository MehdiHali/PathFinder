import { access } from "fs";


declare type algo = "DFS"|"BFS"|"Dijkstra"|"AStart";
type action = 'SELECT'|'WALL'|'ROUTE'|'START'|'GOAL';
interface Prioritized {
    priority: number;
}

abstract class DrawAction {
    static TRAFFIC: string = "TRAFFIC";
    static SELECT: string = "SELECT";
    static WALL: string = "WALL";
    static ROUTE: string = "ROUTE";
    static START: string = "START";
    static GOAL: string = "GOAL";
}

export {type action,type algo, type Prioritized, DrawAction};