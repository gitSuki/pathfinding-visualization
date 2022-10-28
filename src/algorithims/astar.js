import { getUnvisitedNeighbors } from "./helper.js";

// returns a list of all visited nodes in the order they were visited
// all other nodes besides the startNode have their distance set to infinity
export default function aStar(grid, startNode, targetNode) {
  // Initialized closedSet and openSet and initialize the distance for the starting node
  // closedSet = the set of nodes that have been traversed
  // openSet = the set of discovered nodes that haven't been traversed yet
  let closedSet = [];
  let openSet = [];
  startNode.distanceSoFar = 0;
  openSet.push(startNode);

  // processes each node until the reaching the target
  while (openSet.length > 0) {
    // Find the smallest element in the openSet
    const currNode = findClosest(openSet);

    // If it has reached the target node then terminates,
    // returning the closedSet to be animated
    if (currNode === targetNode) return closedSet;

    // Otherwise gets the current node's connections
    const connections = getConnections(currNode, grid)
    console.log(connections)

    // ------

    openSet = removeNodeFromArray(currNode, openSet);

    if (currNode.isWall) continue;
    currNode.isVisited = true;
    updateNeighbors(currNode, grid, openSet, targetNode);
    closedSet.push(currNode);
  }
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

function findClosest(openSet) {
  // looping through the openSet to find the closest node
  let curr = openSet[0];
  let closestNodeIndex = 0;
  for (let i = 0; i < openSet.length; i++) {
    // if curr is farther away than openSet[i]
    if (curr.totalDistance > openSet[i].totalDistance) {
      curr = openSet[i];
      closestNodeIndex = i;
    }
    // if curr and openSet are the same distance, but curr's
    // manhattanDistance is farther away than openSet[i]'s
    else if (
      curr.totalDistance === openSet[i].totalDistance &&
      curr.manhattanDistance > openSet[i].manhattanDistance
    ) {
      curr = openSet[i];
      closestNodeIndex = i;
    }
  }
  openSet.splice(closestNodeIndex, 1);
  return curr;
}

function removeNodeFromArray(nodeToRemove, openList) {
  return openList.filter((node) => node !== nodeToRemove);
}

function updateNeighbors(node, grid, openSet, targetNode) {
  let neighbors = getUnvisitedNeighbors(node, grid);
  // looping through array of unvisited neighbors
  for (let neighbor of neighbors) {
    const newDistance = node.distanceSoFar + 1;
    let newPath = false;
    if (openSet.includes(neighbor)) {
      if (newDistance < neighbor.distanceSoFar) {
        neighbor.distanceSoFar = newDistance;
        newPath = true;
      }
      openSet.push(neighbor);
    } else {
      neighbor.distanceSoFar = newDistance;
      openSet.push(neighbor);
      newPath = true;
    }

    if (newPath) {
      neighbor.manhattanDistance = calculateManhattanDistance(neighbor, targetNode);
      neighbor.totalDistance = neighbor.distanceSoFar + neighbor.manhattanDistance;
      neighbor.previousNode = node;
    }
  }
}

function calculateManhattanDistance(nodeOne, nodeTwo) {
  const xDistance = Math.abs(nodeOne.row - nodeTwo.row);
  const yDistance = Math.abs(nodeOne.col - nodeTwo.col);
  return xDistance + yDistance;
}
