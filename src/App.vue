<template>
  <div id="app" style="padding: 100px;">
    <!-- <p>{{selected[0]}}</p> -->
    <!-- <li-cascader
      :options="options"
      popover-height="200px"
      :selected="selected"
      @update:selected="selected = $event"
    >
    </li-cascader> -->
    <li-cascader
      :options.sync="options"
      popover-height="200px"
      :selected.sync="selected"
    >
    </li-cascader>
    <p>22222222222</p>
  </div>
</template>

<script>
let optionsdemo=[
  {
    cityName: '浙江',
    children: [
      {
        cityName: '杭州',
        children: [{cityName: '上城'},{cityName: '下城'},{cityName: '江干'},]
      },
      {
        cityName: '嘉兴',
        children: [{cityName: '南湖'},{cityName: '秀洲'},{cityName: '嘉善'},
        ]
      },
    ]
  },
  {
    cityName: '福建',
    children: [
      {
        cityName: '福州',
        children: [{cityName: '鼓楼'},{cityName: '台江'},{cityName: '仓山'},]
      },
    ]
  },
  {
    cityName: '安徽',
    children: [
      {
        cityName: '合肥',
        children: [{cityName: '瑶海'},{cityName: '庐阳'},]
      },
    ]
  }
]
import db from './components/cascader/db'

// 回调版本
// function ajax(cityCode = 0, success,fail) {
//   let timerId = setTimeout(()=> {
//     let result =  db.filter( item => item.cityCode === cityCode.toString())
//     console.log(result)
//     success(result)
//   },3000)
//   return timerId
// }

// Promise版本
function ajax2 (cityCode) {
  return new Promise((resolve, reject)=> {
    setTimeout(()=>{
      let result = db.map(item => {
        return { 'cityName': item.cityName, 'cityCode': item.cityCode}
      })
      if(cityCode) {
        // 找到市区
        let city =  db.filter( item => item.cityCode == cityCode.toString())[0].children
        // 不要数组第一项 数组第一项有问题
        city.shift()
        result = city.map(item => {
          return { 'cityName': item.cityName, 'cityCode': item.cityCode}
        })
      }
      resolve(result)
    },500)
  })
}
// console.log(ajax(11))
export default {
  data() {
    return {
      // 保存当前被选中的内容
      selected: [],
      // 数据源
      options: optionsdemo
    }
  },
  methods: {
    // xxx(newSelected) {
    //   const cityCode = this.selected[0].cityCode
    //   ajax2(cityCode).then( result =>{
    //     console.log(this)
    //     // 在最初的数据源里面找到 用户选中的项
    //     let lastLevelSelected =  this.options.filter( item => {
    //       // 这里少写了一个return折腾了一个下午
    //       return item['cityCode'] === cityCode
    //     })[0]
    //     this.$set(lastLevelSelected, 'children', )
    //   })
    // },

    // 用户要
    loadData(lastItem, updateOptions) {
      const cityCode =  lastItem.cityCode
      ajax2(cityCode).then( result=> {
        updateOptions(result)
      })
      setTimeout(() => {
        console.log(this.options)
      }, 1000);
    }

  },
  created() {
    // ajax2(0).then((result)=> {
    //   this.options = result
    // })
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* :root伪类选择器匹配文档根元素。 */
/* 直接写.g-button也行 */
html {--font-size: 14px;}
/* :root伪类选择器配合var()函数 */
body {font-size: var(--font-size);}
img { max-width: 100%;}
</style>
