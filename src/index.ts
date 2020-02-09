import {Graph} from './lib/Graph.js'

const graph = new Graph();

let graphData = ["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"]

for(let d of graphData){
    let digit = Number(d.slice(2))
    graph.addVertex(d[0],d[1],digit)
}

graph.showGraph();

console.log('Delivery cost for route A-B-E is', graph.costOfRoute('A-B-E'));
console.log('Delivery cost for route A-D is', graph.costOfRoute('A-D'))
console.log('Delivery cost for route E-A-C-F is', graph.costOfRoute('E-A-C-F'))
console.log('Delivery cost for route A-B-F is', graph.costOfRoute('A-D-F'));


console.log('Number of possible routes from E to D with a maximum of 4 stop without using the same route twice is', graph.allRoutes('E', 'D', {
    maximumStop: 4,
    allowSameRoute: false
}).length);

console.log('Number of possible routes from E to E without using the same route twice is', graph.allRoutes('E', 'E', {
    allowSameRoute: false
}).length)

console.log('Number of possible routes from E to E such that delivery cost is less than 20 and same route can be used twice is', graph.allRoutes('E', 'E', {
    allowSameRoute: true,
    maximumCost: 19,
    allowLoop: true
}).length);

console.log('Cost of cheapest delivery route between E to D is', graph.lowestCostRoute('E', 'D').cost)
console.log('Cost of cheapest delivery route between E to E is', graph.lowestCostRoute('E', 'E').cost)