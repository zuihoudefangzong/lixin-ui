<template>
  <form class="li-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'LiForm',
  props: {
    // model表单数据对象
    model: Object,
    // rulse表单验证规则
    rules: Object,
  },
  // eventBus 依赖provide
  provide () {
    return {
      form: this
    }
  },
  methods: {
    // 用户提交表单form的验证 接受函数为参数
    validate(callback) {
      // 过滤完 调用LiFormItem的validate方法(return的是Promise对象)
      const tasks = this.$children
        .filter( child => child.$options.name === 'LiFormItem' && child.prop)
        .map(child => child.validate())
      
      // .then 所有成功就 callback
      Promise.all(tasks)
        .then(() => callback(true) )
        .catch( () => callback(false))
    }
  }
};
</script>

<style lang="scss" scoped>

</style>