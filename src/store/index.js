import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      startNode: {
        row: 10,
        col: 5,
      },
      endNode: {
        row: 10,
        col: 45,
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
