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
  isShortestPathAnim: Boolean,
  previousNode: null,
  distance: null,
});

// click and drag functionality
function handleMouseDown(row, col) {
  // disables if animation is running
  if (!store.getters.getAnimState) {
    const grid = store.getters.getGrid;
    if (!grid.cells[row][col].isStart && !grid.cells[row][col].isEnd) {
      grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
    }
    store.dispatch("clickHold");
  }
}

function handleMouseEnter(row, col) {
  // disables if mouse is not held or animation is running
  if (store.getters.getMouseState && !store.getters.getAnimState) {
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
      'shortest-path-node': isShortestPathAnim,
    }"
  ></div>
</template>

<style scoped>
div {
  width: 25px;
  height: 25px;
  outline: 1px solid #4f5153;
  display: inline-block;
  transition: 500ms linear all;
}

.start-node {
  background-image: url("../assets/start.svg");
  background-size: 100%;
}
.end-node {
  background-image: url("../assets/target.svg");
  background-size: 100%;
}

.visited-node {
  background-color: #00adb5;
  animation: 2000ms ease-out forwards visited-anim;
}

.shortest-path-node {
  background-color: rgb(207, 66, 66);
  animation: 1000ms ease-out forwards shortest-path-anim;
}

.wall-node {
  background-color: #15181a;
  animation: 500ms forwards wall-anim;
}

@keyframes visited-anim {
  0% {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(0, 217, 159, 0.75);
  }

  100% {
    transform: scale(1);
    background-color: #00adb5;
  }
}

@keyframes wall-anim {
  0% {
    transform: scale(0.75);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shortest-path-anim {
  0% {
    transform: scale(0.3);
    background-color: #eeeeee;
  }

  50% {
    transform: scale(1.2);
    background-color: #eeeeee;
  }

  100% {
    transform: scale(1);
    background-color: rgb(207, 66, 66);
  }
}
</style>
