<template>
  <div class="notes-edit">
    <header class="notes-edit__header">
      <span v-if="this.id !== undefined">{{ titleForEdit }}</span>
      <span v-if="this.id === undefined">{{ titleForNew }}</span>               
      <VBtn
        @click="showPopupCancel"
        title="Cancel"        
        :disabled="false"            
        prependIcon="cancel"        
      />      
    </header>
    <main class="notes-edit__main">
      <div class="actions">
        <router-link
          class="link-btn"
          :to="{name: 'notes'}"
        >          
          <VBtn
            class="action-btn action-btn__save"
            @click="setNote"
            title="Save note"        
            :disabled="false"        
            :bg_green="true"
            prependIcon="save"        
          />
        </router-link>                  
        <VBtn
          class="action-btn"
          @click="showPopupDelete"
          title="Delete note"        
          :disabled="this.id === undefined"        
          :bg_red="true"
          prependIcon="delete"        
        />       


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
            placeholder="Add todo"           
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

    <VPopup
      v-if="isInfoPopupVisible === true"
      @closePopup="closePopup"
      popupTitle="Confirm action"          
    >
      <div>
        <p>Are you sure you want to delete the note <b>"{{ popupCurrentNoteTitle }}"</b>?</p>
        <div class="popup-actions">              
          <VBtn
            @click="closePopup"
            class="close-modal"         
            title="Cancel"
            prependIcon="cancel"
          />
          <router-link
            class="link-btn"
            :to="{name: 'notes'}"
          > 
            <VBtn
              @click="deleteNote"                          
              title="Delete note"        
              :disabled="false"        
              :bg_red="true"
              prependIcon="delete"        
            />   
          </router-link>
        </div>
      </div>
    </VPopup>

    <VPopup
      v-if="isCancelPopupVisible === true"
      @closePopup="closePopup"
      popupTitle="Confirm action"          
    >
      <div>
        <p>Are you sure you want to cancel changes</p>
        <div class="popup-actions">              
          <VBtn
            @click="closePopup"
            class="close-modal"         
            title="Cancel"
            prependIcon="cancel"
          />
          <router-link
            class="link-btn"
            :to="{name: 'notes'}"
          > 
            <VBtn
              @click="cancelChanges"                          
              title="Don't save"        
              :disabled="false"        
              :bg_red="true"
              prependIcon="delete"        
            />   
          </router-link>
        </div>
      </div>
    </VPopup>
    
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VBtn from "./VBtn"
import VTextField from "./VTextField"
import VPopup from "./VPopup"

export default {
  name: 'NotesEdit',
  components: {
    VBtn,
    VTextField,
    VPopup
  },  
  props: {
    
  },
  data() {
    return {      
      titleForEdit: 'Edit note', 
      titleForNew: 'New note',
      id: this.$route.params.id,
      noteParams: {},
      newTodo: '',
      isInfoPopupVisible: false,
      popupCurrentNoteTitle: '',
      isCancelPopupVisible: false
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
      this.isInfoPopupVisible = false;
    },
    cancelChanges() {
      if (this.id !== undefined) {
        this.noteParams = JSON.parse(JSON.stringify(this.note(this.id)));
      } else {
        this.noteParams = {};
      }
      this.newTodo = '';
      this.isCancelPopupVisible = false;
    },
    showPopupDelete() {
      this.isInfoPopupVisible = true;        
    },
    closePopup() {
      this.isInfoPopupVisible = false;
      this.isCancelPopupVisible = false;
    },
    showPopupCancel() {
      this.isCancelPopupVisible = true;
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
  mounted() {
    this.popupCurrentNoteTitle = this.noteParams.name;
  }, 
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
        width: 100%;          
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
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }
    }    

    .popup-actions {
      display: flex;
      justify-content: space-between;
    }
  }  

  @media (max-width: 959px) {
    .notes-edit {

      .notes-edit__main {
        flex-direction: column;

        .actions {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }

        .action-btn__save {
          margin-right: 20px;
        }

        .note {
          margin-right: 0;
        }
      }     
    }
  }

  @media (max-width: 599px) {
    .notes-edit {

      .notes-edit__main {   
        
        .actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;          
        }

        .action-btn__save {
          margin-right: 0;
          margin-bottom: 10px;
        }

        .todo-item {
          flex-wrap: wrap; 
          
          .v-btn {
            width: 100%;
            margin-top: 10px;
          }
        }  
        
        .form-add-todo {
          flex-direction: column;
        }
        
      }     
    }
  }
</style>