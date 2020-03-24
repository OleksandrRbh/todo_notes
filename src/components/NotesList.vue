<template>
  <div class="notes-list">   
    <h1>{{ title }}</h1>
    <div class="actions">
      <router-link
        :to="{name: 'notes-new'}"
      >
        <button>ADD NOTE</button>
      </router-link>
    </div>
    <div class="list">
      <div class="list-item" 
        v-for="(item, index) of notes" 
        :key="index"
      >
        <h2>{{ item.name }}</h2>
        <div v-if="item.todo_list">
          <p v-if="item.todo_list[0]">{{ item.todo_list[0].todo || '' }}</p>
          <p v-if="item.todo_list[1]">{{ item.todo_list[1].todo || '' }}</p>
          <p v-if="item.todo_list[2]">{{ item.todo_list[2].todo || '' }}</p>  
        </div>
        <button @click="deleteNote(index)">DELETE</button>        
        <router-link
          :to="{name: 'notes-edit', params: {id: index}}"
        >
          <button>EDIT</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'NotesList',
  components: {    
    
  },  
  props: {},
  data() {
    return {
      title: 'Мои заметки',
      
    }
  },
  computed: {
    ...mapState({
        notes: (state) => state.notes
    })
  },
  methods: {
    deleteNote(index) {
      this.$store.dispatch("DELETE_NOTE", index);
    }
  },
  watch: {},
  mounted() {}, 
}
</script>

<style lang="scss">
  .list-item {
    margin: 10px;
    min-height: 20px;
    border: 1px solid #eaeaea;
  }
</style>