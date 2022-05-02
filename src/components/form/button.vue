<template>
  <button
    class="el-button"
    v-bind:class="['el-button-' + type]"
    @click="handleClick"
  >
    <!-- 默认插槽 不需具名指定 -->
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'LgButton',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    handleClick(event) {
      // 取消默认行为
      event.preventDefault()
      // console.log(event)
      this.$emit('click', event)
      // 点击button会触发表单form的提交行为
      
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-color:#409eff;
.el-button {
  display: inline-block;
  background: #fff;
  border: 1px solid #dcdfed;
  text-align: center;
  box-sizing: border-box;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  // 此数字会与当前的字体尺寸相乘来设置行间距
  line-height: 1;
  margin: 0;
}
.el-button-primary {
    color: #fff;
    background-color: $primary-color;
    border-color: $primary-color;
}
</style>