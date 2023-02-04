<script setup>
import GridNode from "./GridNode.vue";
</script>

<template>
    <div>
        <ul>
            <li><grid-node :weight="1"></grid-node>Weight 1 Node</li>
            <li><grid-node :weight="3"></grid-node>Weight 3 Node</li>
            <li><grid-node :weight="5"></grid-node>Weight 5 Node</li>
            <li><grid-node :is-wall="true"></grid-node>Wall Node</li>
        </ul>
        <ul>
            <li><grid-node :is-start="true"></grid-node>Start Node</li>
            <li><grid-node :is-end="true"></grid-node>Target Node</li>
            <li><grid-node :is-visited-anim="true"></grid-node>Visited Node</li>
            <li><grid-node :is-shortest-path-anim="true"></grid-node>Shortest-path Node</li>
            
        </ul>
    </div>
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
    flex-wrap: wrap;
    list-style-type: none;
    margin: 1.5rem 1rem;
}

li {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    margin: 0.25rem 1rem;
    font-weight: bold;
    color: #eeeeee;
}
</style>
