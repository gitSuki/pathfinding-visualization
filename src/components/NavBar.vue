<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["visualization"]);

// logic for locking the navbar while animation is playing
const isAnimActive = computed(() => store.getters.getAnimState);

function runVisualization(algoOption) {
  // automatically clears the board of everything except walls
  clearBoard(false);
  emit("visualization", store.getters.getGrid.cells, algoOption);
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
    store.dispatch("toggleAnimResults", false);
  }
}

// logic for the select dropdown menu
const algoOption = ref("astar");

const algoOptionDisplayText = computed(() => {
  if (algoOption.value === "astar") {
    return "A* Search ";
  } else if (algoOption.value === "djikstra") {
    return "Djikstra ";
  }
});

const chevronStatus = computed(() =>
  store.getters.getIfDropdownDisplayed
    ? "fa-solid fa-chevron-up"
    : "fa-solid fa-chevron-down"
);

function toggleAlgoList() {
  store.dispatch("toggleDropdown", !store.getters.getIfDropdownDisplayed);
}

function changeSelectedAlgo(newAlgo) {
  console.log(algoOption);
  algoOption.value = newAlgo;
}
</script>

<template>
  <nav>
    <h1>Pathfinding Visualization</h1>
    <button class="select-btn" @click="toggleAlgoList">
      {{ algoOptionDisplayText }} <font-awesome-icon :icon="chevronStatus" />
    </button>
    <ul v-if="store.getters.getIfDropdownDisplayed">
      <li @click="changeSelectedAlgo('astar')">A* Search</li>
      <li @click="changeSelectedAlgo('djikstra')">Djikstras</li>
    </ul>
    <button
      @click="runVisualization(algoOption)"
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

ul {
  position: relative;
  display: inline-block;
}

li {
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.select-btn {
  color: #111111;
}

.visualize-btn {
  background-color: #64748b;
  font-weight: bold;
  transition: 250ms linear all;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.visualize-btn:hover {
  background-color: #eeeeee;
  color: #64748b;
  transform: scale(1.05);
}

.clear-btn {
  background-color: #4f5153;
  font-weight: bold;
  transition: 250ms linear all;
}

.clear-btn:hover {
  color: #64748b;
}

.disabled-btn.visualize-btn {
  background-color: #cf4242;
  pointer-events: none;
}

.disabled-btn.clear-btn {
  color: #cf4242;
  pointer-events: none;
}
</style>
