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
  if (!grid.cells[row][col].isStart && !grid.cells[row][col].isEnd) {
    grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
  }
  store.dispatch("clickHold");
}

function handleMouseEnter(row, col) {
  if (store.getters.getMouseState) {
    const grid = store.getters.getGrid;
    if (!grid.cells[row][col].isStart && !grid.cells[row][col].isEnd) {
      grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
    }
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
      'start-node': isStart,
      'end-node': isEnd,
      'wall-node': isWall,
      'visited-node': isVisitedAnim,
    }"
  ></div>
</template>

<style scoped>
div {
  width: 25px;
  height: 25px;
  outline: 1px solid #343f56;
  display: inline-block;
}

.start-node {
  background-color: blue;
}
.end-node {
  background-color: red;
}

.wall-node {
  background-color: #343f56;
  animation: 500ms forwards wall-anim;
}

.visited-node {
  animation: 2500ms ease-out forwards visited-anim;
}

@keyframes visited-anim {
  0% {
    transform: scale(0.3);
    background-color: #000042;
    border-radius: 75%;
  }

  20% {
    background-color: #1168d9;
  }

  40% {
    transform: scale(1.3);
    background-color: #00d99f;
  }

  60% {
    transform: scale(1);
    background-color: #00beda;
  }

  80% {
    transform: scale(1.05);
    background-color: #00beda;
  }

  100% {
    transform: scale(1);
    background-color: #00beda;
  }
}

@keyframes wall-anim {
  0% {
    transform: scale(.75);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1.0);
  }
}
</style>
