<template>
  <div class="notes-list">   
    <div class="actions">  
      <h1>{{ title }}</h1>    
      <router-link
        class="link-btn"
        :to="{name: 'notes-new'}"
      >
      <VBtn
        title="Add note"
        :disabled="false"
        :bg_purple="true"
        prependIcon="add"
      />
      </router-link>      
    </div>
    <div class="list">
      <div class="list-item" 
        v-for="(item, index) of notes" 
        :key="index"
      >
        <div class="list-item__content">
          <div class="list-item__content-title">
            <h2>{{ item.name }}</h2>
          </div>
          <div class="list-item__content-list" v-if="item.todo_list">
            <p v-if="item.todo_list[0]">{{ item.todo_list[0].todo || '' }}</p>
            <p v-if="item.todo_list[1]">{{ item.todo_list[1].todo || '' }}</p>
            <p v-if="item.todo_list[2]">{{ item.todo_list[2].todo || '' }}</p>  
          </div>
        </div>
        <div class="list-item__actions">
          <VBtn
            class="delete-note-btn"
            @click="showPopupInfo(index)"                        
            title="Delete note"        
            :disabled="false"        
            :bg_red="true"
            prependIcon="delete"        
          />       
          <router-link
            class="link-btn"
            :to="{name: 'notes-edit', params: {id: index}}"
          >          
            <VBtn                                         
              title="Edit note"        
              :disabled="false"            
              prependIcon="create"        
            />
          </router-link>          
        </div>

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
              <VBtn
                @click="deleteNote(index)"                          
                title="Delete note"        
                :disabled="false"        
                :bg_red="true"
                prependIcon="delete"        
              />              
            </div>
          </div>
        </VPopup>

      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import VBtn from "./VBtn"
import VPopup from "./VPopup"

export default {
  name: 'NotesList',
  components: {    
    VBtn,
    VPopup
  },  
  props: {},
  data() {
    return {
      title: 'My notes',
      isInfoPopupVisible: false,
      popupCurrentNoteTitle: '',
      noteCurrentIndex: null
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
      this.isInfoPopupVisible = false;
    },
    showPopupInfo(index) {
      this.isInfoPopupVisible = true;
      this.noteCurrentIndex = index;
      this.popupCurrentNoteTitle = this.notes[index].name;      
    },
    closePopup() {
      this.isInfoPopupVisible = false
    }
  },
  watch: {},
  mounted() {}, 
}
</script>

<style lang="scss">
  .notes-list {    

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center; 
      margin-bottom: 20px;
    }    
   
    .list-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 15px;   
      min-height: 130px;
      padding: 20px 30px;
      box-sizing: border-box;
      border-radius: 10px;
      //border: 1px solid #eaeaea;      
      box-shadow: 0 5px 15px rgba(172, 172, 172, 0.5);      
    }

    .list-item__content {
      display: flex;
      flex-direction: row;
      flex-grow: 1;

      &-title {
        display: flex;
        align-items: center;
        width: 50%;
        border-right: 1px solid #cccccc;
      }

      &-list {
        width: 50%;
        padding-right: 10px;  
        padding-left: 30px;        
        box-sizing: border-box;
        text-align: left;
        overflow-x: hidden;
      }

      &-list p{
        margin: 8px 0;        
        color: #007c91;
        overflow-x: hidden;
      }
    }

    .list-item__actions {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .popup-actions {
      display: flex;
      justify-content: space-between;
    }
  }  

  @media (max-width: 959px) {
    .notes-list {

      .list-item {      
        flex-direction: column;              
      }

      .list-item__content {         
        margin-bottom: 10px;
      }

      .list-item__content-title { 
        height: 86px;             
      }

      .list-item__content-list { 
        height: 86px;             
      }

      .list-item__actions {      
        flex-direction: row;
        justify-content: flex-end;
      }

      .delete-note-btn {      
        margin-right: 20px;
      }
    }
  }

  @media (max-width: 599px) {
    .notes-list {

      .list-item__content {         
        flex-direction: column;        
      }

      .list-item__content-title { 
        width: auto; 
        padding: 0 10px 0;
        border-right: none; 
        border-bottom: 1px solid #cccccc;;           
      }

      .list-item__content-list { 
        width: auto; 
        padding: 0 10px 0;            
      }

      .list-item__actions {      
        flex-direction: column;        
      }

      .delete-note-btn {      
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
</style>