<template>
  <div 
    class="v-btn"
    :class="className"
    @click="click"    
  >
    <i class="material-icons material-icons__pre" v-if="prependIcon">{{prependIcon}}</i>
    <span class="v-btn__title">
      {{title}}
    </span>
    <i class="material-icons material-icons__post" v-if="appendIcon">{{appendIcon}}</i>
  </div>
</template>

<script>
export default {
  name: 'VBtn',
  props: {
    title: {
      type: String,
      default: 'Press'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bg_red: {
      type: Boolean,
      default: false
    },
    bg_green: {
      type: Boolean,
      default: false
    },
    bg_purple: {
      type: Boolean,
      default: false
    },
    appendIcon: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    className() {
      return {
        'v-btn__disabled' : this.disabled,
        'v-btn__bg-red' : this.bg_red,
        'v-btn__bg-green' : this.bg_green,
        'v-btn__bg-purple' : this.bg_purple
      }
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
  .v-btn {
    display: flex;
    justify-content: center;
    align-items: center;    
    padding: 10px 20px;
    box-sizing: border-box;
    color: #ffffff;
    font-weight: bolder;
    background-color: #146fe6;
    border-radius: 5px;
    box-shadow: 0 5px 5px rgba(20, 111, 230, 0.3);
    transition: background-color 0.3s, box-shadow  0.3s;
    cursor: pointer;
    &:hover {
      background-color: #1765ca;      
      box-shadow: none;
      transition: background-color 0.3s, box-shadow  0.3s;
    }

    &:hover .material-icons {
      transform: rotate(180deg) scale(1.2);      
      transition: all 0.3s;
    }

    .material-icons {      
      margin-right: 8px;
      font-size: 22px;
      line-height: 20px; 
      transition: all 0.3s;     
      &__post {
        margin-left: 8px;
        margin-right: 0px;
      }      
    }    

    &__disabled {
      pointer-events: none;
      opacity: 0.3;
    }

    &__bg-red {
      background-color: #F44336;
      box-shadow: 0 5px 8px rgba(211, 47, 47, 0.3);
      &:hover {
        background-color: #D32F2F;
      }      
    }

    &__bg-green {
      background-color: #4CAF50;
      box-shadow: 0 5px 8px rgba(56, 142, 60, 0.3);
      &:hover {
        background-color: #388E3C;
      }
    }

    &__bg-purple {
      background-color: #9C27B0;
      box-shadow: 0 5px 8px rgba(123, 31, 162, 0.3);
      &:hover {
        background-color: #7B1FA2;
      }
    }
  }
</style>