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
    isVisited: false,
    isVisitedAnim: false,
    distance: Infinity,
  };
}

// running algorithims
function runDjikstra(grid) {
  const startNode =
    grid[store.getters.getStartNode.row][store.getters.getStartNode.col];
  const endNode =
    grid[store.getters.getEndNode.row][store.getters.getEndNode.col];
  const visitedNodesInOrder = djikstrasAlgo(grid, startNode, endNode);
  animateDjikstra(visitedNodesInOrder);
}

function animateDjikstra(visitedNodesInOrder) {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    setTimeout(() => {
      visitedNodesInOrder[i].isVisitedAnim = true;
      console.log(visitedNodesInOrder[i])
      console.log(10 * i)
    }, 10 * i);
  }
}
</script>

<template>
  <nav>Header</nav>
  <button @click="runDjikstra(grid.cells)">
    Visualize Djikstra's Algorithim
  </button>
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
        :isVisitedAnim="grid.cells[i - 1][j - 1].isVisitedAnim"
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
