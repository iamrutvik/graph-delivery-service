import {Graph} from '../lib/Graph'
import { expect, assert } from 'chai';
import 'mocha';

describe('Graph: Add vertex', () => {
    it('Doesn\'t allow to add vertex with null source and destination', () => {
        const graph = new Graph();
        expect(() => graph.addVertex('','',1)).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1')
    });

    it('Doesn\'t allow to add vertex with negative weight', () => {
        const graph = new Graph();
        expect(() => graph.addVertex('A','B',-1)).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1')
    });

    it('Doesn\'t allow to add vertex with 0 weight', () => {
        const graph = new Graph();
        expect(() => graph.addVertex('A','B',0)).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1')
    });

    it('Add a new vertex', () => {
        const graph = new Graph();
        let vertex = graph.addVertex('A', 'C', 4);
        assert.deepEqual(vertex, { source: 'A', edge: [ { destination: 'C', cost: 4 } ] }, "Did not work, vertex is not matching with expected vertex")
    });

    it('Doesn\'t allow to add vertex with existing edge', () => {
        const graph = new Graph();
        graph.addVertex('A', 'C', 4);
        expect(() => graph.addVertex('A', 'C', 4)).throw('Edge already exists from vertex')
    });
});
