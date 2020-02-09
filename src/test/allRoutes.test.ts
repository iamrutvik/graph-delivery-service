import {Graph} from '../lib/Graph'
import { expect, assert } from 'chai';
import 'mocha';

const createGraph = (graph: any) => {
    let graphData = ["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"]

    for(let d of graphData){
        let digit = Number(d.slice(2))
        graph.addVertex(d[0],d[1],digit)
    }
}

describe('Graph: All Routes Between Vertices', () => {

    it('Doesn\'t allow if any of the vertices doesn\'t exists', () => {
        const graph = new Graph();
        createGraph(graph);
        expect(() => graph.lowestCostRoute('E', 'G')).throw('Invalid source or destination vertex')
    });

    it('Returns number of possible routes with out conditions', () => {
        const graph = new Graph();
        createGraph(graph);
        let routes = graph.allRoutes('E', 'D');
        assert.equal(routes.length, 3);
    });

    it('Returns number of possible routes with a maximum of 4 stop without using the same route twice', () => {
        const graph = new Graph();
        createGraph(graph);
        let routes = graph.allRoutes('E', 'D', { maximumStop: 4, allowSameRoute: false });
        assert.equal(routes.length, 3);
    });

    it('Returns number of possible routes without using same route twice', () => {
        const graph = new Graph();
        createGraph(graph);
        let routes = graph.allRoutes('E', 'E', { allowSameRoute: false });
        assert.equal(routes.length, 5);
    });

    it('Returns number of possible routes that delivery cost is less than 20 and same route can be used twice', () => {
        const graph = new Graph();
        createGraph(graph);
        let routes = graph.allRoutes('E', 'E', { maximumCost: 19, allowSameRoute: true, allowLoop: true });
        assert.equal(routes.length, 29);
    });
});
