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
// ElementUI的表单校验规则来自第三方校验规则参见async-validator
import AsyncValidator from 'async-validator'
export default {
  name: 'LiFormItem',
  props: {
    // 表单域model字段，
    // 在使用validate resetFields方法的情况下该属性是必填的
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
  },
  inject: ['form'],
  methods: {
    validate() {
      // 没传prop值
      if(!this.prop) return
      // 父组件model表单数据对象
      const value = this.form.model[this.prop]
      // rules拿到的是数组
      const rules = this.form.rules[this.prop]

      // 校验规则 username: rules
      const desciptor = {
        [this.prop] : rules
      }
      // 开始用async-validator校验
      const validator = new AsyncValidator(desciptor)
      // 返回值是1个Promise
      return validator.validate(
        {
          // username:'jiankang'
          [this.prop]: value
        },
        errors => {
          if(errors) {
            this.errorMessage = errors[0].message
          }
          else {
            this.errorMessage = ''
          }
        }
      )
    }
  },
  // dom挂载到页面上了
  mounted() {
    // 监听事件自定义事件validate
    this.$on('validate', () => {
      this.validate()
    })
  }
};
</script>

<style lang="scss" scoped>

</style>