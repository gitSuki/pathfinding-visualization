import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      grid: {
        cells: [],
        rows: 20,
        cols: 50,
      },
      startNode: {
        row: 9,
        col: 9,
      },
      endNode: {
        row: 9,
        col: 39,
      },
      draggedNode: null,
      isAnimRunning: false,
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
  },
});
