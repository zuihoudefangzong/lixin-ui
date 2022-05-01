// 用户填写的数据
var data = {
  email: '123.com',
  password: 'xxx'
}

// 校验规则
var rules = [
  { 
    key: 'email',
    pattern: 'email',
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  // {
  //   key: 'password',
  //   minLength: 6,
  //   maxLength: 20,
  // }
]
  


// 校验器vallidator动词
class Validator {

  // 不需要私有属性
  constructor(){}

  // 类static私有方法
  // es5的就是原型私有方法
  static add (name, fn) {
    Validator.prototype[name] = fn
  }

  // 实例方法 es5共有属性
  // validate名词校验
  validate(data, rules){

    // 校验后的结果
    let errors = {}
    rules.forEach( rule => {
      // console.log(rule)
      // data的key  和校验规则的key一样的
      // 这样就可以去到data的里面相应key的值value
      let value = data[rule.key]

      // 先考虑required规则必填的
      if(rule.required) {
        let error = this.required(value)
        if(error) {
          ensureObject(errors, rule['key'])
          errors[rule['key']].required = error
          // 填都没填 剩下的校验规则也不用看了
          return
        }
      }


      // 过滤掉key和required属性
      let validators = Object.keys(rule).filter( key => {
        // 又少写了return
        return key !== 'key' && key !== 'required'
      })

      // 遍历 validators，并逐一调用对应的函数
      validators.forEach( validatorKey => {
        // 先判断是否为内置的校验器
        if(this[validatorKey]){
          // 内置的校验
          let error = this[validatorKey](value, rule[validatorKey])
          if(error) {
            ensureObject(errors, rule['key'])
            errors[rule['key']] = error
          }
        }
        else {
          // 非内置的校验器
          throw new Error(`不存在的内置校验器:${validatorKey}`)
        }
      })

    })
    return errors
  }
  
  // 校验required
  required(value) {
    if(value === 0 || !value ) {
      // value为false 并且 value不等于0
      // 0也是false
      return '必填'
    }
  }

  pattern (value, pattern) {
    if (pattern === 'email') {
      pattern = /^.+@.+$/
    }
    if (pattern.test(value) === false) {
      return '格式不正确'
    }
  }

  minLength (value, minLength) {
    if (value.length < minLength) {
      return '太短'
    }
  }

  maxLength (value, maxLength) {
    if (value.length > maxLength) {
      return '太长'
    }
  }
}

// 确保Object里面的key 也是一个object 
function ensureObject(obj, key) {
  if(!typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}

// 函数或者类
// new Validator(data, rules)
const errors = new Validator().validate(data, rules)

console.log(errors)

export default Validator