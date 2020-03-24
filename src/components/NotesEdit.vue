<template>
  <div class="notes-edit">
    <p>{{ title }}</p>    
      <div class="actions">
        <router-link
          :to="{name: 'notes'}"
        >
          <button @click="setNote">SAVE</button>
        </router-link>
        <router-link
          :to="{name: 'notes'}"
        >
          <button>CANCEL</button>
        </router-link>
        <router-link
          :to="{name: 'notes'}"
        >
          <button @click="deleteNote(this.id)">DELETE</button>
        </router-link>
      </div>
      <div class="note">
        <p>
          <input type="text" name="" v-model="noteParams.name">
        </p>
        <p v-for="(todo, subindex) of noteParams.todo_list" :key="subindex">
          <input type="checkbox" name="" v-model="noteParams.todo_list[subindex].checked">
          <input type="text" name="" v-model="noteParams.todo_list[subindex].todo">        
          <button @click="deleteTodo(subindex)">delele todo</button>
        </p>
        <p>
          <input type="text" name="" v-model="newTodo">
          <button @click="addTodo">add todo</button>
        </p>
      </div>    
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'NotesEdit',
  components: {
    
  },  
  props: {
    
  },
  data() {
    return {      
      title: 'edit here', 
      id: this.$route.params.id,
      noteParams: {},
      newTodo: ''  
    }
  },
  computed: {  
    ...mapGetters({
      note: `getNote`
    }),      
  },
  methods: {
    addTodo() {      
      let obj = {};
      obj.todo = this.newTodo;
      obj.checked = false;
      this.noteParams.todo_list.push(obj);
      this.newTodo = '';      
    },
    deleteTodo(subindex) {
      this.noteParams.todo_list.splice(subindex, 1)
    },
    setNote() {
      console.log(this.noteParams);
      console.log(this.id);
      if (this.$route.params.id || this.$route.params.id === 0) {
        this.$store.dispatch("UPDATE_NOTE", {index: this.id, note: this.noteParams});
      } else {
        this.$store.dispatch("ADD_NOTE", this.noteParams);
      }
    },
    deleteNote(index) {
      this.$store.dispatch("DELETE_NOTE", index);
    }
  },    
  watch: {},
  created() {
    this.noteParams = Object.assign({}, this.note(this.id));
    if (!this.noteParams.name) {
      this.noteParams.name = ''
    }
    if (!this.noteParams.todo_list) {
      this.noteParams.todo_list = []      
    }   
  },
  mounted() {    
    console.log(this.noteParams);  
  }, 
}
</script>

<style lang="scss">
  
</style>