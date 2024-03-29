<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["visualization"]);

// logic for locking the navbar while animation is playing
const isAnimActive = computed(() => store.getters.getAnimState);

function runVisualization(algoOption) {
    // automatically clears the board of everything except walls
    clearBoard(false);
    emit("visualization", store.getters.getGrid.cells, algoOption);
}

function clearBoard(clearWalls) {
    // disables if animation is running
    if (!store.getters.getAnimState) {
        const grid = store.getters.getGrid;
        for (let i = 0; i < grid.rows; i++) {
            for (let j = 0; j < grid.cols; j++) {
                // resets every variable to default
                grid.cells[i][j].isVisited = false;
                grid.cells[i][j].isVisitedAnim = false;
                grid.cells[i][j].isShortestPathAnim = false;
                grid.cells[i][j].previousNode = null;
                grid.cells[i][j].distance = Infinity;
            }
        }
        store.dispatch("toggleAnimResults", false);
    }
}

// logic for the select dropdown menu
const algoOption = ref("astar");

const algoOptionDisplayText = computed(() => {
    if (algoOption.value === "astar") {
        return "A* Search ";
    } else if (algoOption.value === "djikstra") {
        return "Djikstra ";
    }
});

const chevronStatus = computed(() =>
    store.getters.getIfDropdownDisplayed ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"
);

function toggleAlgoList() {
    store.dispatch("toggleDropdown", !store.getters.getIfDropdownDisplayed);
}

function changeSelectedAlgo(newAlgo) {
    algoOption.value = newAlgo;
    store.dispatch("toggleDropdown", !store.getters.getIfDropdownDisplayed);
}
</script>

<template>
    <nav>
        <h1>Pathfinding Visualization</h1>
        <div class="algo-desc">
            <button
                @click="runVisualization(algoOption)"
                class="visualize-btn"
                :class="{ 'disabled-btn': isAnimActive }"
            >
                Visualize
            </button>
            <button @click="clearBoard(true)" class="clear-btn" :class="{ 'disabled-btn': isAnimActive }">
                Clear Board
            </button>
        </div>
        <div class="algo-desc">
            <span>Algorithim:</span>
            <div class="dropdown">
                <button class="select-btn" @click="toggleAlgoList">
                    {{ algoOptionDisplayText }}
                    <font-awesome-icon :icon="chevronStatus" />
                </button>
                <ul class="dropdown-menu" :class="{ 'dropdown-visual': store.getters.getIfDropdownDisplayed }">
                    <li @click="changeSelectedAlgo('astar')">A* Search</li>
                    <hr />
                    <li @click="changeSelectedAlgo('djikstra')">Djikstra</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    gap: 1rem 5rem;
    background-color: #4f5153;
    color: #eeeeee;
    box-shadow: 0 7px 30px rgba(0, 0, 0, 0.15);
}

button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    color: #eeeeee;
}

span {
    font-size: 18px;
    font-weight: 900;
    padding-right: 1rem;
}

hr {
    border-color: #111111;
    border-top: 1px solid #111111;
}

li {
    padding: 1rem;
    transition: 200ms;
}

li:hover {
    background-color: #64748b;
    color: #f1f5f9;
    cursor: pointer;
}

.algo-desc {
    display: flex;
    align-items: center;
}

.visualize-btn {
    background-color: #64748b;
    font-weight: bold;
    transition: 250ms linear all;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.visualize-btn:hover {
    background-color: #eeeeee;
    color: #64748b;
    transform: scale(1.05);
}

.clear-btn {
    background-color: #4f5153;
    font-weight: bold;
    transition: 250ms linear all;
}

.clear-btn:hover {
    color: #64748b;
}

.disabled-btn.visualize-btn {
    background-color: #cf4242;
    pointer-events: none;
}

.disabled-btn.clear-btn {
    color: #cf4242;
    pointer-events: none;
}

.select-btn {
    color: #111111;
    background-color: #f1f5f9;
    width: 12rem;
}

.dropdown {
    position: relative;
}

.dropdown-menu {
    color: #111111;
    background-color: #f8fafc;
    text-align: center;
    position: absolute;
    gap: 1rem;
    left: 0.5rem;
    width: 11rem;
    list-style: none;
    top: calc(100% + 0.5rem);
    background-color: grey;
    border-radius: 0.25rem;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: translateY(-10px);
    transition: all 150ms ease-in-out;
    pointer-events: none;
}

.dropdown-visual {
    background-color: #f8fafc;
    opacity: 1;
    transform: translateY(0px);
    pointer-events: auto;
}
</style>
