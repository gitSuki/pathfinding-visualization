export default function djikstrasAlgo(grid, startNode, finishNode) {
  // returns a list of all visited nodes in order
  // all other nodes besides the startNode have their distance set to infinity
  startNode.distance = 0;
  const visitedNodesInOrder = [];
  const unvisitedNodes = grid.flat().filter((node) => !node.isWall);

  // attempts to find the shortest path to the finishNode by visiting every
  // neighboring unvisited node, marking them as visited and calculating their
  // distance from the starting node. If the target node hasn't been found
  // within the current node's neighbors, assign the new current node to be
  // the one with shortest distance. Loop until the finishNode is found.
  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const currNode = unvisitedNodes.shift();

    // if solution can't be found
    if (currNode.distance === Infinity) return visitedNodesInOrder;

    currNode.isVisited = true;
    visitedNodesInOrder.push(currNode);
    if (currNode === finishNode) return visitedNodesInOrder;
    else updateUnvisitedNeighbors(currNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    unvisitedNeighbors[i].distance = node.distance + 1; // add weighting here
    unvisitedNeighbors[i].previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  // checking all neighboring nodes to see if they're valid
  // if so they are  added to the array
  if (row > 0 && !grid[row - 1][col].isVisited)
    neighbors.push(grid[row - 1][col]);

  if (row < grid.length - 1 && !grid[row + 1][col].isVisited)
    neighbors.push(grid[row + 1][col]);

  if (col > 0 && !grid[row][col - 1].isVisited)
    neighbors.push(grid[row][col - 1]);

  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited)
    neighbors.push(grid[row][col + 1]);
  return neighbors;
}
