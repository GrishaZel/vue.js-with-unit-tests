import Vue from "vue";

export default {
  namespaced: true,
  state() {
    return {
      menu: [],
      menu_is_visible: false
    };
  },
  mutations: {
    SET_MENU(state, menu) {
      Vue.set(state, "menu", menu);
    },
    TOGGLE_VISIBLE_MENU(state) {
      Vue.set(state, "menu_is_visible", !state.menu_is_visible);
    }
  },
  getters: {
    getMenu(state) {
      return state.menu;
    }
  }
};
