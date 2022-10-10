<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import GridNode from "./components/GridNode.vue";

const store = useStore();

// filling out empty 2d grid
// using objects to represent data of each cell in 2d grid
const grid = reactive({
  cells: [],
  rows: 20,
  cols: 50,
});

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
  };
}

// algorithims
function runDjikstra(grid) {
  console.log(grid.cells);
}
</script>

<template>
  <nav>Header</nav>
  <button @click="runDjikstra(grid)">Visualize Djikstra's Algorithim</button>
  <main>
    <div class="row" v-for="i in grid.rows">
      <!-- v-for is 1-indexed -->
      <GridNode
        v-for="j in grid.cols"
        :row="grid.cells[i - 1][j - 1].row"
        :col="grid.cells[i - 1][j - 1].col"
        :isStart="grid.cells[i - 1][j - 1].isStart"
        :isEnd="grid.cells[i - 1][j - 1].isEnd"
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
