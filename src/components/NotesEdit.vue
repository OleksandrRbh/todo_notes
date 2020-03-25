<template>
  <div class="notes-edit">
    <header class="notes-edit__header">
      <span v-if="this.id !== undefined">{{ titleForEdit }}</span>
      <span v-if="this.id === undefined">{{ titleForNew }}</span>      
      <router-link
        class="link-btn"
        :to="{name: 'notes'}"
      >          
        <VBtn
          @click="cancelChanges"
          title="Cancel"        
          :disabled="false"            
          prependIcon="cancel"        
        />
      </router-link>
    </header>
    <main class="notes-edit__main">
      <div class="actions">
        <router-link
          class="link-btn"
          :to="{name: 'notes'}"
        >          
          <VBtn
            class="action-btn"
            @click="setNote"
            title="Save note"        
            :disabled="false"        
            :bg_green="true"
            prependIcon="save"        
          />
        </router-link>        
        <router-link
          class="link-btn"
          :to="{name: 'notes'}"
        >          
          <VBtn
            class="action-btn"
            @click="deleteNote"
            title="Delete note"        
            :disabled="false"        
            :bg_red="true"
            prependIcon="delete"        
          />
        </router-link>
      </div>
      <div class="note">
        <div class="note__title-wrapper">          
          <VTextField
            class="note__title"
            placeholder="Имя заметки"
            v-model="noteParams.name"
            label=""            
          />
        </div>
        <p 
          class="todo-item"
          v-for="(todo, subindex) of noteParams.todo_list" 
          :key="subindex"
        >
          <input class="checkbox" type="checkbox" name="" v-model="noteParams.todo_list[subindex].checked">          
          <VTextField 
            class="todo-field"           
            v-model="noteParams.todo_list[subindex].todo"
            label=""            
          />
          <VBtn
            @click="deleteTodo(subindex)"
            title="Delete todo"        
            :disabled="false"        
            :bg_red="true"
            prependIcon="delete"        
          />
        </p>
        
        <form class="form-add-todo" action="" @submit="addTodo">          
          <VTextField 
            placeholder="Добавить задачу"           
            v-model="newTodo"
            label=""            
          />         
          <VBtn   
            @click="addTodo"            
            title="Add todo"
            :disabled="false"
            :bg_purple="true"
            prependIcon="add"
          />
        </form>
        
      </div> 
    </main>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VBtn from "./VBtn"
import VTextField from "./VTextField"

export default {
  name: 'NotesEdit',
  components: {
    VBtn,
    VTextField
  },  
  props: {
    
  },
  data() {
    return {      
      titleForEdit: 'Edit note', 
      titleForNew: 'New note',
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
      if (!this.noteParams.todo_list) {
        this.noteParams.todo_list = []
      }
      let obj = {};
      obj.todo = this.newTodo;
      obj.checked = false;
      this.noteParams.todo_list.push(obj);
      this.newTodo = '';      
    },
    deleteTodo(subindex) {
      this.noteParams.todo_list.splice(subindex, 1);
    },
    setNote() {      
      if (this.$route.params.id || this.$route.params.id === 0) {
        this.$store.dispatch("UPDATE_NOTE", {index: this.id, note: this.noteParams});
      } else {
        this.$store.dispatch("ADD_NOTE", this.noteParams);
        this.noteParams = {};
      }
    },
    deleteNote() {        
      if (this.id !== undefined) {    
        this.$store.dispatch("DELETE_NOTE", this.id);
      } else {
        this.noteParams = {};
      }
    },
    cancelChanges() {
      if (this.id !== undefined) {
        this.noteParams = JSON.parse(JSON.stringify(this.note(this.id)));
      } else {
        this.noteParams = {};
      }
      this.newTodo = '';
    }
  },    
  watch: {},
  created() {    
    if (this.id !== undefined) {
      this.noteParams = JSON.parse(JSON.stringify(this.note(this.id)));
    }   
    
    if (!this.noteParams.name) {
      this.noteParams.name = ''
    }
    if (!this.noteParams.todo_list) {
      this.noteParams.todo_list = []      
    }   
  },
  mounted() {}, 
}
</script>

<style lang="scss">
  .notes-edit {

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 20px;
      padding: 0 0 20px
    }

    &__main {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between; 
      
      .action-btn {
        margin-bottom: 20px;
      }

      .note {
        background-color: #ede7f6;
        flex-grow: 1;
        padding: 20px;
        margin-right: 20px;
      }

      .note__title-wrapper {        
        padding-bottom: 10px;      
        border-bottom: 1px solid #cccccc;
      }

      .v-textfield.note__title {
        text-align: left;
      }

      .v-textfield.note__title input {
        font-size: 28px;          
      }

      .todo-item {
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 10px 0 10px;
        border-bottom: 1px solid #cccccc
      }      

      .checkbox {
        width: 28px;
        height: 28px;
      }

      .v-textfield.todo-field {
        flex-grow: 1;   
        display: flex;          
      }

      .form-add-todo {
        display: flex;
      }
    }    
  }  
</style>