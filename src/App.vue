<template>
  <div id="app" style="padding: 100px;">
    <li-cascader :options="options"></li-cascader>
  </div>
</template>

<script>

export default {
  data() {
    return {
      options: [
        {
          name: '浙江',
          children: [
            {
              name: '杭州',
              children: [
                {name: '上城'},
                {name: '下城'},
                {name: '江干'},
              ]
            },
            {
              name: '嘉兴',
              children: [
                {name: '南湖'},
                {name: '秀洲'},
                {name: '嘉善'},
              ]
            },
          ]
        },
        {
          name: '福建',
          children: [
            {
              name: '福州',
              children: [
                {name: '鼓楼'},
                {name: '台江'},
                {name: '仓山'},
              ]
            },
          ]
        },
      ]
    }
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
