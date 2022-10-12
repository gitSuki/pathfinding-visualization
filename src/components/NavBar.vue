<script setup>
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(['visualization'])

function runVisualization() {
  emit('visualization')
}

function clearBoard() {
  // disables if animation is running
  if (!store.getters.getAnimState) {
    const grid = store.getters.getGrid;
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
    <h1>Pathfinding Visualization</h1>
    <div></div>
    <button @click="runVisualization">Visualize</button>
    <button @click="clearBoard">Clear Board</button>
  </nav>
</template>