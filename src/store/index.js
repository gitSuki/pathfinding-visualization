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
      isMousePressed: false,
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
    getMouseState(state) {
      return state.isMousePressed;
    },
  },
  mutations: {
    setMouseState(state, payload) {
      state.isMousePressed = payload.isMousePressed;
    },
  },
  actions: {
    clickHold(context) {
      context.commit("setMouseState", { isMousePressed: true });
    },
    clickRelease(context) {
      context.commit("setMouseState", { isMousePressed: false });
    },
  },
});
