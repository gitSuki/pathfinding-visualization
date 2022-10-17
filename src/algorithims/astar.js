import { getUnvisitedNeighbors } from "./helper.js";

export default function aStar(grid, startNode, finishNode) {
  // returns a list of all visited nodes in the order they were visited
  // all other nodes besides the startNode have their distance set to infinity
  let closedSet = [];
  let openSet = [];
  startNode.distance = 0;
  startNode.heuristic = 0;
  startNode.totalDistance = 0;
  openSet.push(startNode);

  while (openSet.length > 0) {
    let currNode = findClosest(openSet);
    if (currNode === finishNode) return visitedNodesInOrder;
    // openSet = removeFromArray(currNode, openSet);

    if (currNode.isWall) continue;
    currNode.isVisited = true;
    updateNeighbors(currNode, grid);
    closedSet.push(currNode);
  }
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
    // heuristic is farther away than openSet[i]'s
    else if (
      curr.totalDistance === openSet[i].totalDistance &&
      curr.heuristic > openSet[i].heuristic
    ) {
      curr = openSet[i];
      closestNodeIndex = i;
    }
  }
  openSet.splice(closestNodeIndex, 1);
  return curr;
}

// function removeFromArray(currNode, openSet) {
//   console.log(openSet);
//   const newSet = openSet.filter((node) => node !== currNode);
//   console.log(newSet);
//   return newSet;
// }

function updateNeighbors(node, grid) {
  const neighbors = getUnvisitedNeighbors(node, grid);
  console.log(neighbors)
}
