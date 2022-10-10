<script setup>
import { defineProps } from "vue";

const props = defineProps({
  row: Number,
  col: Number,
  isStart: Boolean,
  isEnd: Boolean,
  isVisited: Boolean,
  distance: null,
});

function printCoordinate() {
  console.log("Row: " + props.row + " Col: " + props.col);
  console.log(props.isStart);
}
</script>

<template>
  <div
    @click="printCoordinate"
    :class="{ startNode: isStart, endNode: isEnd }"
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
</style>
