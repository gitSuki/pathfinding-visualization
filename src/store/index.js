import { createStore } from "vuex";

export default createStore({
  state() {
    return {
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
