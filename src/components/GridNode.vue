<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  row: Number,
  col: Number,
  isStart: Boolean,
  isEnd: Boolean,
  isWall: Boolean,
  isVisited: Boolean,
  isVisitedAnim: Boolean,
  distance: null,
});

// click and drag functionality
function handleMouseDown(row, col) {
  const grid = store.getters.getGrid;
  grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
  store.dispatch("clickHold");
}

function handleMouseEnter(row, col) {
  if (store.getters.getMouseState) {
    const grid = store.getters.getGrid;
    grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
  }
}

addEventListener("mouseup", () => {
  // global event listener to handle case if user releases mouse
  // outside of grid
  store.dispatch("clickRelease");
});
</script>

<template>
  <div
    @mousedown="handleMouseDown(row, col)"
    @mouseenter="handleMouseEnter(row, col)"
    :class="{
      startNode: isStart,
      endNode: isEnd,
      wallNode: isWall,
      visitedNode: isVisitedAnim,
    }"
  ></div>
</template>

<style scoped>
div {
  width: 25px;
  height: 25px;
  outline: 1px solid #727272;
  display: inline-block;
}

.startNode {
  background-color: blue;
}
.endNode {
  background-color: red;
}

.wallNode {
  background-color: black;
}

.visitedNode {
  background-color: green;
}
</style>
