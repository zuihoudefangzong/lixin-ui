import Validator from "./validator";
// 表单校验示例
export default {
  data() {
    return {
      // 校验规则
      rules:[],
      // 校验完的提示
      errors: {},
      // 实例化一个校验器Validator
      validator: new Validator()
    }
  },
  methods: {
    // change(值改变)/blur(失去焦点)监听调用
    validate(formdata) {
      const rules = this.rules
      const v = this.validator
      this.errors = v.validate(formdata, rules)
    }
  }
}