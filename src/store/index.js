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
        col: 4,
      },
      endNode: {
        row: 9,
        col: 44,
      },
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
  },
  mutations: {},
  actions: {},
});
