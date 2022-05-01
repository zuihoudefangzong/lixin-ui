<template>
  <div class="li-form-item">
    <!-- 用label来显示提示的文本 -->
    <label>{{label}}</label>
    <div>
      <slot></slot>
      <!-- p标签用了显示验证失败的原因 -->
      <p v-if="errorMessage">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiFormItem',
  props: {
    // 表单域model字段，
    // 在使用 validate resetFields方法的情况下该属性是必填的
    prop: {
      type: String,
      // require: true
    },
    // label提示文本
    label: String
  },
  data() {
    return {
      // 显示验证失败的原因message
      errorMessage: ''
    }
  }
};
</script>

<style lang="scss" scoped>

</style>