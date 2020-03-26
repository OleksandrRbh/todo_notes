<template>
  <div class="popup-wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{ popupTitle }}</span>
        <span>
          <i @click="closePopup" class="material-icons">close</i>
        </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>      
      </div>
    </div>
  </div>
</template>

<script>  

  export default {
    name: 'VPopup',
    components: {
      
    },
    props: {
      popupTitle: {
        type: String,
        default: 'Popup name'
      },      
    },
    data() {
      return {
        
      }
    },
    computed: {},
    methods: {
      closePopup() {
        this.$emit('closePopup')
      },
      confirmButtonAction() {
        this.$emit('confirmButtonAction')
      }
    },
    mounted() {
      let vm = this;
      document.addEventListener('click', function(item) {
        if (item.target === vm.$refs['popup_wrapper']) {
          vm.closePopup();
        }
      })
    }
  }
</script>

<style lang="scss">
  .popup-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(100, 100, 100, 0.6);
    z-index: 10;
  }

  .v-popup {
    padding: 16px;
    position: fixed;
    top: 50px;    
    width: 400px;
    max-width: -webkit-fill-available;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 15px #e7e7e7;
    

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .material-icons {
        cursor: pointer;
      }
    }
    
  }

</style>