<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import GridNode from "./components/GridNode.vue";

const store = useStore();

// creating empty 2d grid
const grid = reactive({
  cells: [],
  rows: 20,
  cols: 50,
});

for (let i = 0; i < grid.rows; i++) {
  grid.cells[i] = [];
}
</script>

<template>
  <nav>Header</nav>
  <main>
    <div class="row" v-for="i in grid.rows">
      <GridNode
        class="col"
        v-for="j in grid.cols"
        :key="[i, j]"
        :row="i"
        :col="j"
        :isStart="
          i === store.getters.getStartNode.row &&
          j === store.getters.getStartNode.col
        "
        :isEnd="
          i === store.getters.getEndNode.row &&
          j === store.getters.getEndNode.col
        "
      ></GridNode>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* border: 1px solid red; */
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 7.5px;
  padding-right: 7.5px;
}

.row {
  display: flex;
}
</style>
