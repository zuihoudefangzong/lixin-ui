<template>
  <div class="collapse-item">
    <div class="title" @click="toggle" :data-name="name">
      {{title}}
    </div>
    <div class="content" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiCollapseItem',
  props: {
    // 面板标题
    title: {
      type: String,
      // 必传
      require: true
    },
    // name当前面板唯一标识符
    name: {
      // string/number
      type: String,
      require: true
    }
  },
  data() {
    return {
      // default不打开
      open: false
    }
  },
  inject: ['eventBus'],
  methods: {
    // 监听用户点击面板
    // 由于数据流的复杂性 先告诉父组件
    toggle () {
      if (this.open) {
        // 直接触发eventbus事件就行 在mouted中$on监听关闭
        this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
      }
      else {
        // 直接触发eventbus事件就行 在mouted中$on监听打开
        this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
      }
    }
  },
  mounted() {
    // 由于数据流的复杂性 
    // 子组件collapse只$on监听update:selected事件
    // 让父组件告诉我要不要打开
    this.eventBus && this.eventBus.$on('update:selected', names => {
      // names是1个数组 查看自身是否包含数组里
      if( names.indexOf(this.name) >= 0 ) {
        this.open = true
      }
      // 不包含数组里面
      else {
        // console.log(this.name,'关闭')
        this.open = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
$grey: #ebeef5;
$border-radius: 4px;
.collapse-item {
  >.title {
    // 每个面板titl都应该有border
    border: 1px solid $grey;
    // 避免重叠 占父元素的位置
    margin: -1px;
    margin-bottom: 0;
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  // 第一个div.collapse-item
  &:first-child {
    .title {
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }

  }
  // 最后一个div.collapse-item
  &:last-child {
    >.title:first-child {
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
    margin-bottom: -1px;
  }
  // 这里div.centent可以不加的 
  >.content {
    padding: 8px;
  }
}
</style>