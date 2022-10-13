<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["visualization"]);

const isAnimActive = computed(() => store.getters.getAnimState);

function runVisualization() {
  // automatically clears the board of everything except walls
  clearBoard(false);
  emit("visualization");
}

function clearBoard(clearWalls) {
  // disables if animation is running
  if (!store.getters.getAnimState) {
    const grid = store.getters.getGrid;
    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.cols; j++) {
        // resets every variable to default
        if (clearWalls) grid.cells[i][j].isWall = false;
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
    <button
      @click="runVisualization"
      class="visualize-btn"
      :class="{ 'disabled-btn': isAnimActive }"
    >
      Visualize
    </button>
    <button
      @click="clearBoard(true)"
      class="clear-btn"
      :class="{ 'disabled-btn': isAnimActive }"
    >
      Clear Board
    </button>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
  background-color: #4f5153;
  color: #eeeeee;
  box-shadow: 0 7px 30px rgba(0, 0, 0, 0.15);
}

button {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  color: #eeeeee;
}
.visualize-btn {
  background-color: #00adb5;
  font-weight: bold;
  transition: 250ms linear all;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.visualize-btn:hover {
  background-color: #eeeeee;
  color: #00adb5;
  transform: scale(1.05);
}

.clear-btn {
  background-color: #4f5153;
  font-weight: bold;
  transition: 250ms linear all;
}

.clear-btn:hover {
  color: #00adb5;
}

.disabled-btn.visualize-btn {
  background-color: rgb(207, 66, 66);
  pointer-events: none;
}

.disabled-btn.clear-btn {
  color: rgb(207, 66, 66);
  pointer-events: none;
}
</style>
