<script setup>
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
    isBeingDragged: Boolean,
    previousNode: null,
    distanceSoFar: null,
    weight: Number,
});

// clicking and dragging functionality for walls and and start/end nodes
const grid = store.getters.getGrid;

function handleClick(row, col) {
    console.log(props.distanceSoFar);
    if (!store.getters.getAnimState && !store.getters.getIfResultsDisplayed) {
        if (grid.cells[row][col].isStart === false && grid.cells[row][col].isEnd === false) {
            grid.cells[row][col].isVisitedAnim = false;
            grid.cells[row][col].isShortestPathAnim = false;
            grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
        }
    }
}

function handleDragStart(row, col) {
    if (!store.getters.getAnimState && !store.getters.getIfResultsDisplayed) {
        if (grid.cells[row][col].isStart) {
            grid.cells[row][col].isBeingDragged = true;
            store.dispatch("changeDraggedNode", "start");
        } else if (grid.cells[row][col].isEnd) {
            grid.cells[row][col].isBeingDragged = true;
            store.dispatch("changeDraggedNode", "end");
        } else {
            grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
        }
    }
}

function handleDragEnter(row, col) {
    if (!store.getters.getAnimState && !store.getters.getIfResultsDisplayed) {
        if (store.getters.getDraggedNode === "start") {
            grid.cells[row][col].isStart = true;
        } else if (store.getters.getDraggedNode === "end") {
            grid.cells[row][col].isEnd = true;
        } else if (grid.cells[row][col].isStart === false && grid.cells[row][col].isEnd === false) {
            grid.cells[row][col].isVisitedAnim = false;
            grid.cells[row][col].isShortestPathAnim = false;
            grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
        }
    }
}

function handleDragLeave(row, col) {
    if (!store.getters.getAnimState && !store.getters.getIfResultsDisplayed) {
        if (store.getters.getDraggedNode === "start") {
            grid.cells[row][col].isStart = false;
        } else if (store.getters.getDraggedNode === "end") {
            grid.cells[row][col].isEnd = false;
        }
    }
}

function handleDragEnd(row, col) {
    // only effects original node where drag started from
    if (!store.getters.getAnimState && !store.getters.getIfResultsDisplayed) {
        if (store.getters.getDraggedNode === "start") {
            grid.cells[row][col].isStart = false;
            grid.cells[row][col].isBeingDragged = false;
        } else if (store.getters.getDraggedNode === "end") {
            grid.cells[row][col].isEnd = false;
            grid.cells[row][col].isBeingDragged = false;
        }
        store.dispatch("changeDraggedNode", null);
    }
}

function handleDragDrop(row, col) {
    // effects the node where the mouse is hovered over
    if (!store.getters.getAnimState && !store.getters.getIfResultsDisplayed) {
        if (store.getters.getDraggedNode === "start") {
            store.dispatch("changeStartNode", { row: row, col: col });
        } else if (store.getters.getDraggedNode === "end") {
            store.dispatch("changeEndNode", { row: row, col: col });
        } else {
            grid.cells[row][col].isWall = !grid.cells[row][col].isWall;
        }
    }
}

// removes the ghost image effect while dragging
document.addEventListener(
    "dragstart",
    function (event) {
        var img = new Image();
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
        event.dataTransfer.setDragImage(img, 0, 0);
    },
    false
);
</script>

<template>
    <div
        @click="handleClick(row, col)"
        @dragstart="handleDragStart(row, col)"
        @dragenter.prevent="handleDragEnter(row, col)"
        @dragleave.prevent="handleDragLeave(row, col)"
        @dragover.prevent
        @dragend.prevent="handleDragEnd(row, col)"
        @drop="handleDragDrop(row, col)"
        :draggable="true"
        :class="{
            'start-node': isStart,
            'end-node': isEnd,
            'weight-one': weight == 1,
            'weight-two': weight == 3,
            'weight-three': weight == 5,
            'wall-node': isWall,
            'visited-node': isVisitedAnim,
            'shortest-path-node': isShortestPathAnim,
            hide: isBeingDragged,
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
    text-align: center;
    color: #ffffff;
    cursor: grab !important;
}

.start-node {
    background-image: url("../assets/start.svg");
    background-size: 100%;
}
.end-node {
    background-image: url("../assets/target.svg");
    background-size: 100%;
}

.weight-one {
    background-color: #4a5058;
}

.weight-two {
    background-color: #444951;
}

.weight-three {
    background-color: #3e4249;
}

.visited-node {
    background-color: #94a3b8;
    animation: 1500ms ease-out forwards visited-anim;
}

.shortest-path-node {
    background-color: #cf4242;
    animation: 1000ms ease-out forwards shortest-path-anim;
}

.wall-node {
    background-color: #15181a;
    animation: 500ms forwards wall-anim;
}

.hide {
    background-color: #ffffff;
}

@keyframes visited-anim {
    0% {
        transform: scale(0.3);
        background-color: #1e293b;
        border-radius: 100%;
    }

    50% {
        background-color: #475569;
    }

    75% {
        transform: scale(1.2);
        background-color: #71717a;
    }

    100% {
        transform: scale(1);
        background-color: #94a3b8;
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
        background-color: #cf4242;
    }
}
</style>
