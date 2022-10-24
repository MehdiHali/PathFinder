import { access } from "fs";


declare type algo = "DFS"|"BFS"|"Dijkstra"|"AStart";
type action = 'WALL'|'ROUTE'|'START'|'GOAL';

export {type action,type algo};