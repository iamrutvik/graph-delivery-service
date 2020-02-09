# Delivery service using Graph
Computes the delivery cost of a certain route, the number of possible delivery route between two towns, and the cost of cheapest delivery route between two towns.

## Prerequisites 
- Node
- NPM

## Get Started 
1. Clone the repo: `https://github.com/iamrutvik/graph-delivery-service.git`
2. Go to the project folder
3. Run `npm i`
4. Run `npm start`

#### Notes
- `npm start` will run `npm test` first and then will compile TypeScript in `./build` folder. 

- If you want to publish Graph Implementation on NPM(`npm publish`), `prepublishOnly` script is added so the package will be supported for JavaScript as well.

## How to use?
Import the library, create a new object for graph and add vertices to get started.

Example:
```typescript
import {Graph} from './lib/Graph.js'

const graph = new Graph();

let graphData = ["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"]

for(let d of graphData){
    let digit = Number(d.slice(2))
    graph.addVertex(d[0],d[1],digit)
}

//print graph on console with cost
graph.showGraph();

//find cost of route
graph.costOfRoute('E-A-C-F') 
//returns 8

//find number of possible routes
graph.allRoutes('E', 'D').length 
//returns 3

//specify conditions when finding number of possible routes
//check method definitions section for available conditions
graph.allRoutes('E', 'D', {
    maximumStop: 4,
    allowSameRoute: false
}).length
//returns 3

//find possible routes between two vertices
graph.allRoutes('E', 'D', {
    maximumStop: 4,
    allowSameRoute: false
})
//returns array with possible routes

//find cheapest route object with cost of route
graph.lowestCostRoute('E', 'D')
// returns object

//find cost of cheapest route between vertices
graph.lowestCostRoute('E', 'D').cost
//returns 9

//find cheapest route between vertices
graph.lowestCostRoute('E', 'D').route
//returns cheapest route
```

## Methods

1. showGraph()
    - Prints Graph on console with vertices and cost of edges

2. addVertex(source: string, destination: string, weight: number)
    - Adds vertex to the graph object
    - Returns newly added vertex
        ```typescript
        { source: 'A', edge: [ { destination: 'C', cost: 4 } ] }
        ```
    - Internally calls `addEdge`
    
3. addEdge(vertex: { edge: { destination: string; weight: number; }[]; }, destination: string, weight: number)
    - Add edge to the `destination` from the `vertex` with `weight`
    - Returns vertex with edges
    - `vertex` is a node object as following:
        ```typescript
          {
            source : "A",
            edge: []
          };
        ```
4. searchVertex(name: string)
    - Search vertex by name
    - Returns vertex
    
5. searchEdge(source: any, destination: string)
    - Search edge between `source` and `destination` vetices
    - Returns edge object
        ```typescript
        { destination: string; cost: number; }
        ```
6. costOfRoute(route: string)
    - Takes route as `-` separated sting
    - Example: "A-B-C-E"
    - Returns cost of specified route as Number
    
7. allRoutes(source: string, destination: string, conditions ?: object)
    - Takes `source`, `destination` and `conditions`
    - Mandatory Parameters:  `source` and `destination`
    - `conditions` specifies the special conditions to be used while finding routes
        ```typescript
        {
           maximumStop?: number //maximum allowed stops between routes
           allowLoop?: boolean; //should allow loop between routes
           maximumCost?: number; // maximum allowed cost for entire route 
           allowSameRoute?: boolean // should allow using the same route between 2 vertices again or not
        }
        ```  
    - Returns array of possible routes
    
8. lowestCostRoute(source: string, destination: string)
    - Finds lowest cost route between `source` and `destination`
    - Returns object with possible cheapest route and it's cost
    ```typescript
       {
           route: array,
           cost: number
       }
    ```      