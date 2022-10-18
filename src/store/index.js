import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      grid: {
        cells: [],
        rows: 20,
        cols: Math.round(screen.width / 27.5),
      },
      startNode: {
        row: 9,
        col: Math.round((screen.width / 30) * 0.2),
      },
      endNode: {
        row: 9,
        col: Math.round((screen.width / 30) * 0.8),
      },
      draggedNode: null,
      isAnimRunning: false,
      isResultsDisplayed: false,
      isDropdownDisplayed: false
    };
  },
  getters: {
    getGrid(state) {
      return state.grid;
    },
    getStartNode(state) {
      return state.startNode;
    },
    getEndNode(state) {
      return state.endNode;
    },
    getDraggedNode(state) {
      return state.draggedNode;
    },
    getAnimState(state) {
      return state.isAnimRunning;
    },
    getIfResultsDisplayed(state) {
      return state.isResultsDisplayed;
    },
    getIfDropdownDisplayed(state) {
      return state.isDropdownDisplayed;
    },
  },
  mutations: {
    setNewStartNode(state, payload) {
      state.startNode.row = payload.row;
      state.startNode.col = payload.col;
    },
    setNewEndNode(state, payload) {
      state.endNode.row = payload.row;
      state.endNode.col = payload.col;
    },
    setDraggedNode(state, payload) {
      state.draggedNode = payload.draggedNode;
    },
    setAnimState(state, payload) {
      state.isAnimRunning = payload.isAnimRunning;
    },
    setIfResultsDisplayed(state, payload) {
      state.isResultsDisplayed = payload.isResultsDisplayed;
    },
    setIfDropdownDisplayed(state, payload) {
      state.isDropdownDisplayed = payload.setIfDropdownDisplayed;
    },
  },
  actions: {
    changeStartNode(context, payload) {
      context.commit("setNewStartNode", { row: payload.row, col: payload.col });
    },
    changeEndNode(context, payload) {
      context.commit("setNewEndNode", { row: payload.row, col: payload.col });
    },
    changeDraggedNode(context, payload) {
      context.commit("setDraggedNode", { draggedNode: payload });
    },
    animRun(context) {
      context.commit("setAnimState", { isAnimRunning: true });
    },
    animEnd(context) {
      context.commit("setAnimState", { isAnimRunning: false });
    },
    toggleAnimResults(context, payload) {
      context.commit("setIfResultsDisplayed", { isResultsDisplayed: payload });
    },
    toggleDropdown(context, payload) {
      context.commit("setIfDropdownDisplayed", { setIfDropdownDisplayed: payload });
    },
  },
});
