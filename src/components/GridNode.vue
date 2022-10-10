<script setup>
import { ref, defineProps, computed } from "vue";

// coordinate data
const props = defineProps({
  row: Number,
  col: Number,
  isStart: Boolean,
  isEnd: Boolean
});

const rowCoordinate = computed(() => props.row - 1);
const colCoordinate = computed(() => props.col - 1);

function printCoordinate() {
  console.log("Row: " + rowCoordinate.value + " Col: " + colCoordinate.value);
  console.log(props.isStart)
  console.log(props.isEnd)
}
</script>

<template>
  <div @click="printCoordinate" :class="{ startNode: isStart, endNode: isEnd }"></div>
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
