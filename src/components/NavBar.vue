<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["visualization"]);

function runVisualization() {
  emit("visualization");
}

const areButtonsDisabled = computed(() => store.getters.getAnimState);

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
    <button
      @click="runVisualization"
      class="visualize-btn"
      :class="{ 'disabled-btn': areButtonsDisabled }"
    >
      Visualize
    </button>
    <button
      @click="clearBoard"
      class="clear-btn"
      :class="{ 'disabled-btn': areButtonsDisabled }"
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
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
  background-color: #4f5153;
  color: #eeeeee;
}

button {
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
