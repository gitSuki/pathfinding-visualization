

export default function djikstrasAlgo(grid, startNode, targetNode) {
  // initializing closedSet and openSet and cost values of start node
  // closedSet = the set of nodes that have been processed
  // openSet = the set of nodes that have been visited from another node
  // but not processed in its own right yet
  let closedSet = [];
  let openSet = [];
  startNode.costSoFar = 0;
  startNode.weight = 0;
  openSet.push(startNode);

  // iterate through, processing each node until reaching the target node
  // or visiting every traversable node
  while (openSet.length > 0) {
    console.log("openSet loop");
    // find the element with the smallest cost in the openSet
    const currNode = openSet.reduce((previous, current) => {
      return openSet.costSoFar > openSet.costSoFar ? current : previous;
    });

    // if it has reached the target node then terminates,
    // returning the closedSet to be animated
    if (currNode === targetNode) break;

    // otherwise gets the current node's connections
    const connections = getConnections(currNode, grid);

    //
    for (const connection of connections) {
      const { row, col } = connection;
      // calculates the cost to each connected node of currNodes
      const cost = currNode.costSoFar + connection.weight;
      // skips if the node is closed (has already been processed)
      if (closedSet.includes(connection)) {
        continue;
      }

      // or if it's open and we've found a worse route
      else if (openSet.includes(connection)) {
        // finding the node in openSet which corresponds
        // to the current connection (connections of currNode)
        const temp = grid[row][col];
        if (temp.costSoFar > cost) continue;
      }

      // otherwise we know we've got an unvisited node, or
      // found a shorter distance
      grid[row][col].costSoFar = cost;
      grid[row][col].previousNode = currNode;
      openSet.push(grid[row][col]);
    }

    closedSet.push(currNode);
    // removes the currNode from openSet
    openSet = openSet.filter((node) => node !== currNode);
  }
  console.log('Done')
  console.log(closedSet);
  return closedSet;
}

function getConnections(node, grid) {
  const { col, row } = node;
  const connections = [];
  if (row > 0) connections.push(grid[row - 1][col]);
  if (col > 0) connections.push(grid[row][col - 1]);
  if (row < grid.length - 1) connections.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) connections.push(grid[row][col + 1]);

  return connections;
}
