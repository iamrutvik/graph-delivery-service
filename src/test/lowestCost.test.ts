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

describe('Graph: Cost of Cheapest Route', () => {

    it('Doesn\'t allow if any of the vertices doesn\'t exists', () => {
        const graph = new Graph();
        createGraph(graph);
        expect(() => graph.lowestCostRoute('E', 'G')).throw('Invalid source or destination vertex')
    });

    it('Returns lowest cost between between two routes', () => {
        const graph = new Graph();
        createGraph(graph);
        const route = graph.lowestCostRoute('E', 'D');
        assert.equal(route.cost, 9);
    });

    it('Returns lowest cost between between two routes', () => {
        const graph = new Graph();
        createGraph(graph);
        const route = graph.lowestCostRoute('E', 'E');
        assert.equal(route.cost, 6);
    });
});
