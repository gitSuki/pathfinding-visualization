<script setup>
import { reactive } from "vue";

// creating empty 2d grid
const grid = reactive({
  cells: [],
  rows: 20,
  cols: 30
});

for (let i = 0; i < grid.rows; i++) {
  grid.cells[i] = [];
}
</script>

<template>
  <nav>Header</nav>
  <main>
    <div class="row" v-for="i in grid.rows">
      <div class="col" v-for="j in grid.cols">{{ j }}</div>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 1px solid red;
}

.row {
  display: flex;
}

.col {
  background-color: lightgray;
  border-style:solid;
  border-width: 1px;
}
</style>
