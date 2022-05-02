<template>
  <li-form :model="user" :rules="rules">
    <li-form-item
      label="用户名"
      prop="username"
    >
      <lg-input 
        :value="user.username"
        @input="user.username = $event"
        placeholder="请输入用户名"
      ></lg-input>
    </li-form-item>

    <li-form-item
      label="密码"
      prop="password"
    >
      <lg-input 
        :value="user.password"
        type="password"
        @input="user.password = $event"
        placeholder="请输入密码"
      ></lg-input>
    </li-form-item>

    <li-form-item>
      <lg-button>登录</lg-button>
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
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码'
          }
        ]
      }
    };
  },
  methods: {
    // handleClick(event) {
    //   console.log(event)
    // }
  },
};
</script>

<style lang="scss" scoped>

</style>