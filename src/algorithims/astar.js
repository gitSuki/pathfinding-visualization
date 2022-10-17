import { getUnvisitedNeighbors } from "./helper.js";

export default function aStar(grid, startNode, finishNode) {
  // returns a list of all visited nodes in the order they were visited
  // all other nodes besides the startNode have their distance set to infinity

  // gScore = distance travelled from start to current cell
  // fScore = gScore + estimated remaining distance to finishNode
  // closedSet = the set of nodes that have been traversed
  // openSet = the set of discovered nodes that haven't been traversed yet
  // and are sorted by fScore
  let closedSet = [];
  let openSet = [];
  startNode.distance = 0;
  startNode.heuristic = 0;
  startNode.totalDistance = 0;
  openSet.push(startNode);

  while (openSet.length > 0) {
    let currNode = findClosest(openSet);
    if (currNode === finishNode) return closedSet;

    openSet = removeNodeFromArray(currNode, openSet);
    if (currNode.isWall) continue;
    currNode.isVisited = true;
    updateNeighbors(currNode, grid, openSet, closedSet, finishNode);
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

function removeNodeFromArray(nodeToRemove, openList) {
  return openList.filter(node => node !== nodeToRemove)
}

function updateNeighbors(node, grid, openSet, closedSet, finishNode) {
  let neighbors = getUnvisitedNeighbors(node, grid);

  // looping through neighbors array
  for (let neighbour of neighbors) {
    if (!closedSet.includes(neighbour)) {
      console.log(node.distance)
      let temp = node.distance + 1;
      let newPath = false;
      if (openSet.includes(neighbour)) {
        if (temp < neighbour.distance) {
          neighbour.distance = temp;
          newPath = true;
        }

        openSet.push(neighbour);
      } else {
        neighbour.distance = temp;
        openSet.push(neighbour);
        newPath = true;
      }

      if (newPath) {
        neighbour.heuristic = manhattanDistance(neighbour, finishNode);
        neighbour.totalDistance = neighbour.distance + neighbour.heuristic;
        neighbour.previousNode = node;
      }
    }
  }
}

function manhattanDistance(nodeOne, nodeTwo) {
  let x = Math.abs(nodeOne.row - nodeTwo.row);
  let y = Math.abs(nodeOne.col - nodeTwo.col);

  return x + y;
}
