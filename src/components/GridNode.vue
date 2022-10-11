<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  row: Number,
  col: Number,
  isStart: Boolean,
  isEnd: Boolean,
  isVisited: Boolean,
  isVisitedAnim: Boolean,
  distance: null,
});

function printCoordinate() {
  const grid = store.getters.getGrid
  console.log(grid.cells[props.row][props.col])
}
</script>

<template>
  <div
    @click="printCoordinate"
    :class="{ startNode: isStart, endNode: isEnd, visitedNode: isVisitedAnim }"
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

.visitedNode {
  background-color: green;
}
</style>
