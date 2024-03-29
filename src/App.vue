<script setup>
import { useStore } from "vuex";
import NavBar from "./components/NavBar.vue";
import GridDescription from "./components/GridDescription.vue";
import GridNode from "./components/GridNode.vue";
import astarAlgo from "./algorithims/astar.js";
import djikstrasAlgo from "./algorithims/djikstra.js";

const store = useStore();

// filling out empty 2d grid
// using objects to represent data of each cell in the 2d grid
const grid = store.getters.getGrid;

for (let i = 0; i < grid.rows; i++) {
    const currentRow = [];
    for (let j = 0; j < grid.cols; j++) {
        currentRow.push(createGridNodeObject(i, j));
    }
    grid.cells.push(currentRow);
}

function createGridNodeObject(row, col) {
    const randomWeights = [1, 3, 5, "wall"];
    // random selects a value from the randomWeights array
    const nodeType = randomWeights[Math.floor(Math.random() * randomWeights.length)];
    const isStartNode = store.getters.getStartNode.row === row && store.getters.getStartNode.col === col
    const isEndNode = store.getters.getEndNode.row === row && store.getters.getEndNode.col === col
    return {
        row: row,
        col: col,
        isStart: isStartNode,
        isEnd: isEndNode,
        isWall: nodeType === "wall" && !isStartNode && !isEndNode,
        isVisited: false,
        isVisitedAnim: false,
        isShortestPathAnim: false,
        isBeingDragged: false,
        previousNode: null,
        distanceSoFar: Infinity,
        weight: nodeType !== "wall" ? nodeType : null,
    };
}

// running algorithims
function runAlgo(grid, algoOption) {
    store.dispatch("animRun");
    const startNode = grid[store.getters.getStartNode.row][store.getters.getStartNode.col];
    const endNode = grid[store.getters.getEndNode.row][store.getters.getEndNode.col];

    if (algoOption === "djikstra") {
        runDjikstra(grid, startNode, endNode);
    } else {
        runAstar(grid, startNode, endNode);
    }
}

function runAstar(grid, startNode, endNode) {
    const closedSet = astarAlgo(grid, startNode, endNode);
    const shortestPath = findShortestPath(endNode);
    animateAlgo(closedSet, shortestPath);
}

function runDjikstra(grid, startNode, endNode) {
    const visitedNodesInOrder = djikstrasAlgo(grid, startNode, endNode);
    const shortestPath = findShortestPath(endNode);
    animateAlgo(visitedNodesInOrder, shortestPath);
}

function findShortestPath(endNode) {
    const shortestPath = [];
    let currNode = endNode;
    while (currNode !== null) {
        shortestPath.unshift(currNode);
        currNode = currNode.previousNode;
    }
    return shortestPath;
}

function animateAlgo(visitedNodesInOrder, shortestPath) {
    // creates the delayed animation effect that shows all the nodes
    // that the search algorithm visited in order
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length - 1) {
            setTimeout(() => {
                animateShortestPath(shortestPath);
                store.dispatch("toggleAnimResults", true);
            }, 15 * i);
        }
        setTimeout(() => {
            visitedNodesInOrder[i].isVisitedAnim = true;
        }, 15 * i);
    }
}

function animateShortestPath(shortestPath) {
    // creates the delayed animation effect to show the shortest path
    // once the search algorithm has discovered the end node
    for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
            if (i === shortestPath.length - 1) store.dispatch("animEnd");
            shortestPath[i].isVisitedAnim = false;
            shortestPath[i].isShortestPathAnim = true;
        }, 25 * i);
    }
}
</script>

<template>
    <nav-bar @visualization="runAlgo"></nav-bar>
    <grid-description></grid-description>
    <main>
        <content>
            <div class="row" v-for="i in grid.rows">
                <!-- v-for is 1-indexed -->
                <grid-node
                    v-for="j in grid.cols"
                    :row="grid.cells[i - 1][j - 1].row"
                    :col="grid.cells[i - 1][j - 1].col"
                    :isStart="grid.cells[i - 1][j - 1].isStart"
                    :isEnd="grid.cells[i - 1][j - 1].isEnd"
                    :isWall="grid.cells[i - 1][j - 1].isWall"
                    :isVisited="grid.cells[i - 1][j - 1].isVisited"
                    :isVisitedAnim="grid.cells[i - 1][j - 1].isVisitedAnim"
                    :isShortestPathAnim="grid.cells[i - 1][j - 1].isShortestPathAnim"
                    :isBeingDragged="grid.cells[i - 1][j - 1].isBeingDragged"
                    :previousNode="grid.cells[i - 1][j - 1].previousNode"
                    :distanceSoFar="grid.cells[i - 1][j - 1].distanceSoFar"
                    :weight="grid.cells[i - 1][j - 1].weight"
                ></grid-node>
            </div>
        </content>
    </main>
</template>

<style>
@font-face {
    font-family: kiona-regular;
    src: url(./assets/Kiona-Regular.ttf);
}

* {
    font-family: kiona-regular, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #36393e;
}

main {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1600px;
    padding-left: 7.5px;
    padding-right: 7.5px;
}

.row {
    display: flex;
}
</style>
