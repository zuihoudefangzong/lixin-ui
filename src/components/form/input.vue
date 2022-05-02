<template>
  <div>
    <!-- $attrs通过v-bind显性的绑定到非根元素 -->
    <input
      :type="type"
      :value="value"
      @input="handleInput"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  name: 'LgInput',
  // 当使用lgInput组件 属性传参时候
  // 非props里面定义好的属性
  // 默认继承到lgInput组件最外层的根元素div上
  // inheritAttrs: false,
  props: {
    value: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)

      // 为了input组件的分离复用 找到他所有的$parent是否触发validator
      // 方法一while循环
      const findParent = parent => {
        while(parent) {
          // 基线条件 找了直接跳出while循环
          if (parent.$options.name === 'LiFormItem') {
            break
          }
          else {
            parent = parent.$parent
          }
        }
        // 最后找到了
        return parent
      }
      // 方法二 递归实现
      // const findParent  = parent => {
      //   if(!parent) { return undefined }
      //   // 基线条件 找了直接跳出循环
      //   if(parent.$options.name === 'LiFormItem'){
      //     return parent
      //   }
      //   else {
      //     findParent(parent.$parent)
      //   }
      // }

      // 触发自定义事件validate
      const parent = findParent(this.$parent)
      if(parent) {
        parent.$emit('validate')
      }

    }
  }
};
</script>

<style lang="scss" scoped>

</style>