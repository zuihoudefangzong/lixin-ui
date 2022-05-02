<template>
  <li-form>
    <li-form-item
      label="用户名"
      :prop="user.username"
    >
      <lg-input 
        :value="user.username"
        @input="user.username = $event"
        placeholder="请输入用户名"
      />
    </li-form-item>

    <li-form-item
      label="密码"
      :prop="user.password"
    >
      <lg-input 
        :value="user.password"
        type="password"
        @input="user.password = $event"
        placeholder="请输入密码"
      />
    </li-form-item>

    <li-form-item>
      <lg-button @click="handleClick">登录</lg-button>
    </li-form-item>
  </li-form>
</template>

<script>
import LiForm from './components/form/form.vue'
import LiFormItem from './components/form/form-item.vue'
import LgButton from './components/form/button.vue'
import LgInput from './components/form/input.vue'
export default {
  name: 'LiFormTest',
  components: { LiForm, LiFormItem, LgButton, LgInput},
  data() {
    return {
      user: {
        username: '',
        password: ''
      },

      // Element-ui校验规则的外层
      userRules: {
        // 校验规则 始终是数组Array 多个校验条件
        username: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码应为6-16位的长度', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleClick(event) {
      console.log(event)
    }
  },
};
</script>

<style lang="scss" scoped>

</style>