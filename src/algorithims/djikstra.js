export default function djikstrasAlgo(grid, startNode, finishNode) {
  // all other nodes besides the startNode have their distance set to infinity
  startNode.distance = 0;
  const visitedNodesInOrder = [];
  const unvisitedNodes = grid.cells.flat(); // flattened version of original 2d array

  // attempts to find the shortest path to the finishNode by visiting every
  // neighboring unvisited node, marking them as visited and calculating their
  // distance from the starting node. If the target node hasn't been found
  // within the current node's neighbors, assign the new current node to be
  // the one with shortest distance. Loop until the finishNode is found.
  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const currNode = unvisitedNodes.shift();
    currNode.isVisited = true;
    visitedNodesInOrder.push(currNode);

    if (currNode === finishNode) return visitedNodesInOrder;
    else updateUnvisitedNeighbors(currNode, grid.cells);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, gridCells) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, gridCells);
  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    unvisitedNeighbors[i].distance = node.distance + 1; // add weighting here
    unvisitedNeighbors[i].previousNode = node;
  }
}

function getUnvisitedNeighbors(node, gridCells) {
  const neighbors = [];
  const { col, row } = node;
  // checking all neighboring nodes to see if they're valid
  // if so they are  added to the array
  if (row > 0 && !gridCells[row - 1][col].isVisited)
    neighbors.push(gridCells[row - 1][col]);
  if (row < gridCells.length - 1 && !gridCells[row + 1][col].isVisited)
    neighbors.push(gridCells[row + 1][col]);
  if (col > 0 && !gridCells[row][col - 1].isVisited)
    neighbors.push(gridCells[row][col - 1]);
  if (col < gridCells[0].length - 1 && !gridCells[row][col + 1].isVisited)
    neighbors.push(gridCells[row][col + 1]);
  return neighbors;
}