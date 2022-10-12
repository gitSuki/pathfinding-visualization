<script setup>
import { useStore } from "vuex";
import GridNode from "./components/GridNode.vue";
import djikstrasAlgo from "./algorithims/djikstra.js";

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
    isWall: false,
    isVisited: false,
    isVisitedAnim: false,
    isShortestPathAnim: false,
    previousNode: null,
    distance: Infinity,
  };
}

// running algorithims
function runDjikstra(grid) {
  store.dispatch("animRun");
  const startNode =
    grid[store.getters.getStartNode.row][store.getters.getStartNode.col];
  const endNode =
    grid[store.getters.getEndNode.row][store.getters.getEndNode.col];
  const visitedNodesInOrder = djikstrasAlgo(grid, startNode, endNode);
  const shortestPath = findShortestPath(endNode);
  animateDjikstra(visitedNodesInOrder, shortestPath);
}

function findShortestPath(endNode) {
  const shortestPath = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
}

function animateDjikstra(visitedNodesInOrder, shortestPath) {
  // creates the delayed animation effect that shows all the nodes
  // that djikstras algo visited in order
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(shortestPath);
      }, 10 * i);
    }
    setTimeout(() => {
      visitedNodesInOrder[i].isVisitedAnim = true;
    }, 10 * i);
  }
}

function animateShortestPath(shortestPath) {
  // creates the delayed animation effect to show the shortest path
  // once djikstras algo has discovered the end node
  for (let i = 0; i < shortestPath.length; i++) {
    setTimeout(() => {
      if (i === shortestPath.length - 1) store.dispatch("animEnd");
      shortestPath[i].isVisitedAnim = false;
      shortestPath[i].isShortestPathAnim = true;
    }, 25 * i);
  }
}

// navbar functions
function clearBoard() {
  // disables if animation is running
  if (!store.getters.getAnimState) {
    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.cols; j++) {
        grid.cells[i][j].isWall = false;
        grid.cells[i][j].isVisited = false;
        grid.cells[i][j].isVisitedAnim = false;
        grid.cells[i][j].isShortestPathAnim = false;
        grid.cells[i][j].previousNode = null;
        grid.cells[i][j].distance = Infinity;
      }
    }
  }
}
</script>

<template>
  <nav>
    <button @click="runDjikstra(grid.cells)">
      Visualize Djikstra's Algorithim
    </button>
    <button @click="clearBoard">Clear Board</button>
  </nav>
  <main>
    <div class="row" v-for="i in grid.rows">
      <!-- v-for is 1-indexed -->
      <GridNode
        v-for="j in grid.cols"
        :row="grid.cells[i - 1][j - 1].row"
        :col="grid.cells[i - 1][j - 1].col"
        :isStart="grid.cells[i - 1][j - 1].isStart"
        :isEnd="grid.cells[i - 1][j - 1].isEnd"
        :isWall="grid.cells[i - 1][j - 1].isWall"
        :isVisited="grid.cells[i - 1][j - 1].isVisited"
        :isVisitedAnim="grid.cells[i - 1][j - 1].isVisitedAnim"
        :isShortestPathAnim="grid.cells[i - 1][j - 1].isShortestPathAnim"
        :previousNode="grid.cells[i - 1][j - 1].previousNode"
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
