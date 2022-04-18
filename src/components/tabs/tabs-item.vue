<template>
  <div class="tabs-item" @click="onClick" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:  'LiTabsItem',
  props: {
    // 每个选项卡name
    name: {
      type: String || Number,
      // 必传
      require: true
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
  },
  // 在任何后代组件里，我们都可以使用inject选项
  // 接收指定的我们想要添加在这个实例上的 property
  inject: ['eventBus'],
  data() {
    return {
      active: false
    }
  },
  created(){
    this.eventBus.$on('update:selected', (name,vm) => {
      // if( name === this.name) {
      //   console.log(`item${this.name}被选中了`)
      //   this.active = true
      // }else {
      //   console.log(`item${this.name}我没有被选中`)
      //   this.active = true
      // }
      this.active = name === this.name
    })
  },
  methods: {
    onClick() {
      // 先判断一下按钮是否可点击
      if (this.disabled) return
      // this.$emit('update:selected','这是组件本身向外抛出的事件');
      this.eventBus && this.eventBus.$emit('update:selected', this.name, this)
      // 当用户切换选项卡 要想父组件tabs-head抛出click事件
      this.$emit('click', this)
    }
  },
  computed: {
    classes() {
      return {
        'active': this.active,
        'disabled': this.disabled
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: blue;
$disabled-color: grey;
.tabs-item {
  flex-shrink: 0;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  &.active {
    color: blue;
  }
  &.disabled {
    color: $disabled-color;
    cursor: not-allowed;
  }
}
</style>