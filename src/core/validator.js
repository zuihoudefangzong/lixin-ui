export default function validator(data, rules) {
    // 校验后的结果
    let errors = {}
    rules.forEach( rule => {
      // console.log(rule)
      // data的key  和校验规则的key一样的
      // 这样就可以去到data的里面相应key的值value
      let value = data[rule.key]
      // 假如当前校验规则是必填的
      if(rule.required) {
        // 用户没填 或者是number0
        if(!value && value !== 0) {
          errors[rule.key] = { required: '必填'}
        }
      }
      // 开始校验正则了
      if(rule.patten) {
        // isEmail
        if(rule.patten === 'isEmail') {
          ensureObject(errors,rule[key])
          if(/^.+@.+$/.test(value) === false) {
            errors[rule.key].pattern = 'email格式不正确'
          }
        }
      }

      if(rule.minLength) {
        if(value.length < rule.minLength ) {
          ensureObject(errors,rule[key])
          errors[rule.key].minLength = '太短'
        }
      }
    })
    return errors
}

// 确保Object里面的key 也是一个object 
function ensureObject(obj, key) {
  if(!typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}