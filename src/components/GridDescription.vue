<script setup>
import GridNode from "./GridNode.vue";
</script>

<template>
  <ul>
    <li><grid-node :is-start="true"></grid-node>Start Node</li>
    <li><grid-node :is-end="true"></grid-node>Target Node</li>
    <li><grid-node :is-visited-anim="true"></grid-node>Visited Node</li>
    <li>
      <grid-node :is-shortest-path-anim="true"></grid-node>Shortest-path Node
    </li>
    <li><grid-node :is-wall="true"></grid-node>Wall Node</li>
  </ul>
</template>

<style scoped>
* {
  outline: none !important;
  animation: none !important;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  list-style-type: none;
  margin: 1rem;
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #eeeeee;
}
</style>
