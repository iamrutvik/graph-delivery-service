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

describe('Graph: Cost of Route', () => {
    it('Doesn\'t allow null route', () => {
        const graph = new Graph();
        expect(() => graph.costOfRoute('')).throw('Invalid route. Expects route with "-" between nodes. Ex: ​​"A-B-C-D"')
    });

    it('Doesn\'t allow wrong route argument', () => {
        const graph = new Graph();
        expect(() => graph.costOfRoute('ABC')).throw('Invalid route. Expects route with "-" between nodes. Ex: ​​"A-B-C-D"')
    });

    it('Returns route cost between two vertices', () => {
        const graph = new Graph();
        createGraph(graph);
        assert.equal(graph.costOfRoute('A-D'), 10)
    });

    it('Returns route cost between three vertices', () => {
        const graph = new Graph();
        createGraph(graph);
        assert.equal(graph.costOfRoute('A-B-E'), 4)
    });

    it('Returns route cost between four vertices', () => {
        const graph = new Graph();
        createGraph(graph);
        assert.equal(graph.costOfRoute('E-A-C-F'), 8)
    });

    it('Returns No Such Route if no direct route A-D-F', () => {
        const graph = new Graph();
        createGraph(graph);
        assert.equal(graph.costOfRoute('A-D-F'), 'No Such Route');
    });

    it('Returns No Such Route if no direct route A-E-C-G, with one of the vertex does not exists', () => {
        const graph = new Graph();
        createGraph(graph);
        assert.equal(graph.costOfRoute('A-E-C-G'), 'No Such Route');
    });
});
