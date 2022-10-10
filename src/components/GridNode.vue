<script setup>
import { defineProps, computed } from "vue";

// coordinate data
const props = defineProps({
  row: Number,
  col: Number,
});

const rowCoordinate = computed(() => props.row - 1);
const colCoordinate = computed(() => props.col - 1);

function printCoordinate() {
  console.log("Row: " + rowCoordinate.value + " Col: " + colCoordinate.value);
}
</script>

<template>
  <div @click="printCoordinate">Hi</div>
</template>
