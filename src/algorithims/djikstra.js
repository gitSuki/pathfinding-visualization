import { getUnvisitedNeighbors } from "./helper.js";

export default function djikstrasAlgo(grid, startNode, finishNode) {
  // returns a list of all visited nodes in the order they were visited
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

function updateUnvisitedNeighbors(currNode, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(currNode, grid);
  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    unvisitedNeighbors[i].distance = currNode.distance + unvisitedNeighbors[i].weight; // add weighting here
    unvisitedNeighbors[i].previousNode = currNode;
  }
}
