<template>
  <div class="v-textfield">
    <label for="">{{ label }}
      <input
        type="text"
        :value="value"
        @input="input"        
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'VTextField',    
  props: {
    value: {
      type: [String, Number],
      default: ''        
    },
    label: {
      type: String,
      default: ''
    }    
  },
  data() {
    return {
      
    }
  },
  methods: {
    input(e) {
      let value = e.target.value;
      this.$emit('input', value);
    }
  }
}
</script>

<style lang="scss">
  .v-textfield {
    & input {
      min-width: 250px;
      min-height: 30px;
      padding: 5px 10px;
      box-sizing: border-box;
      //border: 1px solid #146fe6;
      border: none;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.6);
      outline: none;      

      &:focus {
        color: #146fe6;        
      }
    }
    
  }
</style>