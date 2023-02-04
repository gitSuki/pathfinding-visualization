import { getUnvisitedNeighbors } from "./helper.js";

export default function aStar(grid, startNode, finishNode) {
    // returns a list of all visited nodes in the order they were visited
    // all other nodes besides the startNode have their distance set to infinity

    // closedSet = the set of nodes that have been traversed
    // openSet = the set of discovered nodes that haven't been traversed yet
    let closedSet = [];
    let openSet = [];
    startNode.distance = 0;
    startNode.manhattanDistance = 0;
    startNode.totalDistance = 0;
    openSet.push(startNode);

    while (openSet.length > 0) {
        let currNode = findClosest(openSet);
        if (currNode === finishNode) return closedSet;

        openSet = removeNodeFromArray(currNode, openSet);
        if (currNode.isWall) continue;
        currNode.isVisited = true;
        updateNeighbors(currNode, grid, openSet, finishNode);
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
    return openList.filter(node => node !== nodeToRemove);
}

function updateNeighbors(node, grid, openSet, finishNode) {
    let neighbors = getUnvisitedNeighbors(node, grid);
    // looping through array of unvisited neighbors
    for (let neighbor of neighbors) {
        const newDistance = node.distance + 1;
        let newPath = false;
        if (openSet.includes(neighbor)) {
            if (newDistance < neighbor.distance) {
                neighbor.distance = newDistance;
                newPath = true;
            }
            openSet.push(neighbor);
        } else {
            neighbor.distance = newDistance;
            openSet.push(neighbor);
            newPath = true;
        }

        if (newPath) {
            neighbor.manhattanDistance = calculateManhattanDistance(neighbor, finishNode);
            neighbor.totalDistance = neighbor.distance + neighbor.manhattanDistance;
            neighbor.previousNode = node;
        }
    }
}

function calculateManhattanDistance(nodeOne, nodeTwo) {
    const xDistance = Math.abs(nodeOne.row - nodeTwo.row);
    const yDistance = Math.abs(nodeOne.col - nodeTwo.col);
    return xDistance + yDistance;
}
