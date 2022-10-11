<script setup>
import { useStore } from "vuex";
import GridNode from "./components/GridNode.vue";

const store = useStore();

// filling out empty 2d grid
// using objects to represent data of each cell in the 2d grid
const grid = store.getters.getGrid;

for (let i = 0; i < grid.rows; i++) {
  const currentRow = [];
  for (let j = 0; j < grid.cols; j++) {
    currentRow.push(createGridNodeObject(i, j));
  }
  grid.cells.push(currentRow);
}

function createGridNodeObject(row, col) {
  return {
    row: row,
    col: col,
    isStart:
      store.getters.getStartNode.row === row &&
      store.getters.getStartNode.col === col,
    isEnd:
      store.getters.getEndNode.row === row &&
      store.getters.getEndNode.col === col,
    isVisited: false,
    distance: Infinity,
  };
}

// running algorithims
function runDjikstra(grid, startNode, finishNode) {
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

    if (currNode === finishNode) return;
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
</script>

<template>
  <nav>Header</nav>
  <button @click="runDjikstra(grid, grid.cells[store.getters.getStartNode.row][store.getters.getStartNode.col], grid.cells[store.getters.getEndNode.row][store.getters.getEndNode.col])">Visualize Djikstra's Algorithim</button>
  <main>
    <div class="row" v-for="i in grid.rows">
      <!-- v-for is 1-indexed -->
      <GridNode
        v-for="j in grid.cols"
        :row="grid.cells[i - 1][j - 1].row"
        :col="grid.cells[i - 1][j - 1].col"
        :isStart="grid.cells[i - 1][j - 1].isStart"
        :isEnd="grid.cells[i - 1][j - 1].isEnd"
        :isVisited="grid.cells[i - 1][j - 1].isVisited"
        :distance="grid.cells[i - 1][j - 1].distance"
      ></GridNode>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 7.5px;
  padding-right: 7.5px;
}

.row {
  display: flex;
}
</style>
