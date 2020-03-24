import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {      
    setNotes(state, notes) {
      state.notes = notes;
    },
    setNote(state, note) {
      state.notes.push(note);
    },
    updateNote(state, {index, note}) {
      state.notes.splice(index, 1, note);
    },
    deleteNote(state, note) {
      state.notes.splice(note, 1);
    },
    saveToLocalStorage(state) {
      localStorage.setItem("notes", JSON.stringify(state.notes));
    } 
  },
  getters: {
    getNote: (state) => (id) => {
      return state.notes[id];
    }
  },
  actions: {      
    INIT_STATE(state) {
        let notes;
        try {
          notes = JSON.parse(localStorage.getItem("notes"));
        } catch (e) {
          console.error(e);
        }
        state.commit("setNotes", notes || []);
    },
    ADD_NOTE(state, payload) {
      state.commit("setNote", payload);
      state.commit("saveToLocalStorage");
    },
    UPDATE_NOTE(state, {index, note}) {
      state.commit("updateNote", {index, note});
      state.commit("saveToLocalStorage");
    },
    DELETE_NOTE(state, payload) {
      state.commit("deleteNote", payload);
      state.commit("saveToLocalStorage");
    },
  }

});

export default store;