function isNumber(x: any): x is number {
    return x && typeof x === "number";
}

function isString(x: any): x is string {
    return x && typeof x === "string";
}

function isObject(x: any): x is string {
    return x && typeof x === "object";
}

class Graph {
    private graph: any[];

    constructor() {
        this.graph = [];
    }

    showGraph() {
        for(let vertex of this.graph)  {
           for(let edge of vertex.edge){
               console.log(`${vertex.source} => ${edge.destination} (${edge.cost})`)
           }
        }
    }

    /**
     * Create a new node
     * @param {string} source
     * @param {string} destination
     * @param {number} cost
     * @returns {object} newly created node
     */
    addVertex(source: string, destination: string, cost: number) : any {

        //validation
        if (!isString(source) || !isString(destination) || !isNumber(cost) || cost < 1) {
            throw new Error('Data type mismatch, expects source, destination as string and cost as number greater than 1');
        }

        let retrievedVertex = this.searchVertex(source);

        //if node not found with the source, create a new node
        if (!retrievedVertex) {
            retrievedVertex = {
                source,
                edge: []
            };

            //Add node to graph
            this.graph.push(retrievedVertex);
        }

        //Add edge for the node & return node
        return this.addEdge(retrievedVertex, destination, cost);
    }

    /**
     * Add weighted edge for a node
     * @param {object} vertex
     * @param {string} destination
     * @param {number} cost
     * @returns {object} new created node with edge
     */
    addEdge(vertex: { edge: { destination: string; cost: number; }[]; }, destination: string, cost: number) : any {

        //Check if edge is already exist
        let edge = vertex.edge.filter(v => v.destination === destination);
        if (edge.length) {
            throw new Error('Edge already exists from vertex')
        }
        vertex.edge.push({
            destination,
            cost
        });

        //return vertex
        return vertex

    }

    /**
     * Find a vertex
     * @param {string} name of existing node
     * @returns {object} found node
     */
    searchVertex(name: string) {
        return this.graph.filter(v => v.source === name).pop()
    }

    /**
     * check whether edge exists from source to destination or not
     * @param source
     * @param destination
     */
    searchEdge(source: any, destination: string) {
        let vertex = this.searchVertex(source);
        if (!vertex) return;
        return vertex.edge.filter((e: { destination: any; }) => e.destination === destination).pop()
    }

    /**
     * Calculates Cost of Delivery Route
     * @param {string} route
     * @returns {number} Cost
     */
    costOfRoute(route: string) : number | string {
        let routes: string[];
        let cost: number = 0, _i: number = 0;

        routes = route.split('-');
        if (routes.length < 2) {
            throw new Error('Invalid route. Expects route with "-" between nodes. Ex: ​​"A-B-C-D"')
        }

        //check if source node exists from the route
        let sourceVertex = this.searchVertex(routes[0]);
        if (!sourceVertex) {
            return 'No Such Route';
        }

        for (_i = 0; _i < routes.length - 1; _i++) {
            let retrievedRoute = this.searchEdge(routes[_i], routes[_i + 1]);
            if (!retrievedRoute) {
                return 'No Such Route'
            }
            cost += retrievedRoute.cost;
        }
        return cost;
    }

    /**
     * Finds all possible routes from source to destination given by conditions
     * @param {string} source
     * @param {string} destination
     * @param {object} conditions
     */
    allRoutes(source: string, destination: string, conditions ?: {
        maximumStop?: number
        allowLoop?: boolean;
        maximumCost?: number;
        allowSameRoute?: boolean}) : any[] | string {

        //Data validation check
        if (!isString(source) || !isString(destination) || (conditions && !isObject(conditions))) {
            throw new Error('Data type mismatch, expects source, destination as string and Conditions as JSON Object');
        }

        if(!this.searchVertex(source) || !this.searchVertex(destination)){
            throw new Error('Invalid source or destination vertex');
        }

        //Setting default value
        //@ts-ignore
        conditions = conditions ? { maximumStop:10, ...conditions }: { maximumStop: 10, allowLoop: false};

        //check if source node exists
        let sourceVertex = this.searchVertex(source);
        if (!sourceVertex) {
            return 'No Such Route'
        }

        let feasibleRoutes: any[] = [];

        this.traverse(sourceVertex, [sourceVertex.source], feasibleRoutes, conditions);

        feasibleRoutes = feasibleRoutes.filter(route => route[route.length - 1] === destination);

        //Now allowing same route again
        // @ts-ignore
        if (!conditions || !conditions.allowSameRoute) {
            for (let _i = 0; _i < feasibleRoutes.length; _i++) {
                for (let _j = 0; _j < feasibleRoutes[_i].length; _j++) {
                    let routeExist = false;
                    for (let _k = 0; _k < feasibleRoutes.length; _k++) {
                        let tempRoute1 = feasibleRoutes[_i];
                        let tempRoute2 = feasibleRoutes[_k];
                        // check if tempRoute2 is already exist in tempRoute1
                        if (_k !== _i && tempRoute2.join(',') && tempRoute1.join(',').indexOf(tempRoute2.join(',')) === 0 && tempRoute1[tempRoute1.length - 1] === destination) {
                            routeExist = true;
                            break;
                        }
                    }
                    //if route already exist, then
                    if (routeExist) {
                        feasibleRoutes[_i] = [];
                        break;
                    } else {
                        let route = feasibleRoutes[_i].shift();
                        feasibleRoutes[_i].push(route);
                    }
                }
            }
            feasibleRoutes = feasibleRoutes.filter(route => route.length);
        }
        return feasibleRoutes;
    }

    /**
     * Traversal - Find Possible Routes from source against conditions
     * @param {object} source
     * @param {object} routes
     * @param {object} possibleRoutes
     * @param {object} conditions
     */
    traverse(source: { edge: any[]; destination: any; }, routes: any[], possibleRoutes: any[], conditions ?: {
        maximumStop?: number
        allowLoop?: boolean;
        maximumCost?: number;
        allowSameRoute?: boolean}) {
        source.edge.forEach(vertex => {
            //check for allowing same routes
            if (!conditions || !conditions.allowSameRoute) {
                let route = routes.join(',');

                //If route already exist in the routes
                if (route.indexOf(`${source.destination},${vertex.destination}`) !== -1) {
                    return
                }
            }

            let currentRoute = routes.slice(0);
            currentRoute.push(vertex.destination);

            //check for maximum cost allowed
            if (conditions && conditions.maximumCost) {
                let cost = this.costOfRoute(currentRoute.join('-'));
                // @ts-ignore
                if (cost > conditions.maximumCost)
                    return
            }
            possibleRoutes.push(currentRoute);

            //check for loops if they are allowed  or not
            if(!conditions || !conditions.allowLoop) {
                //If route already visited
                let foundRoute = routes.filter(r => r === vertex.destination);
                if (foundRoute.length) {
                    return;
                }
            }

            //check for maximum stops
            if (conditions && conditions.maximumStop) {
                if (currentRoute.length - 1 === conditions.maximumStop) {
                    return;
                }
            }

            let currentVertex = this.searchVertex(vertex.destination)
            if (currentVertex) {
                this.traverse(currentVertex, currentRoute, possibleRoutes, conditions);
            }
        })
    }

    /**
     * Find the cheapest delivery route between source and destination
     * @param {string} source
     * @param {string} destination
     * @returns {object} Object with cheapest route and cost
     */
    lowestCostRoute(source: string, destination: string): any {

        //Data validation check
        if (!isString(source) || !isString(destination)) {
            throw new Error('Data type mismatch, expects source, destination as string');
        }

        if(!this.searchVertex(source) || !this.searchVertex(destination)){
            throw new Error('Invalid source or destination vertex');
        }

        // @ts-ignore
        let feasibleRoutes = this.allRoutes(source, destination);

        let lowestCostRoute: never[] = [];
        let minCost = Infinity;
        if (typeof feasibleRoutes !== "string") {
            feasibleRoutes.forEach(route => {
                let cost = this.costOfRoute(route.join('-'));
                if (isNumber(cost) && cost < minCost) {
                    lowestCostRoute = route;
                    minCost = cost;
                }
            });
        }

        return {
            route: lowestCostRoute,
            cost: minCost
        }
    }
}
export { Graph }