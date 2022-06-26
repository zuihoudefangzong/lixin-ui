<template>
  <li-nav
    :selected.sync="selected"
    vertical
    style="width:200px; margin:20px;"
    @update:selected="onChange"
  >
    <li-nav-item name="home">首页</li-nav-item>
    <!-- <li-nav-item name="about">关于</li-nav-item> -->
    <li-sub-nav name="about">
      <template slot="title">关于</template>
      <li-nav-item name="culture">企业文化</li-nav-item>
      <li-nav-item name="develops">开发团队</li-nav-item>
      <li-sub-nav name="contacts">
        <template slot="title">联系方式</template>
        <li-nav-item name="wechat">微信</li-nav-item>
        <li-nav-item name="qq">qq</li-nav-item>
        <li-sub-nav name="phone">
          <template slot="title">手机</template>
          <li-nav-item name="cm">移动</li-nav-item>
          <li-nav-item name="cu">联通</li-nav-item>
          <li-nav-item name="cn">电信</li-nav-item>
        </li-sub-nav>
      </li-sub-nav>
    </li-sub-nav>
    <li-nav-item name="hire">招聘</li-nav-item>
  </li-nav>
</template>


<script>
import LiNav from './components/nav/nav.vue'
import LiNavItem from './components/nav/nav-item.vue'
import LiSubNav from './components/nav/sub-nav.vue'

export default {
  name: 'LiNavTest',
  components: { LiNav,LiNavItem,LiSubNav},
  data () {
    return {
      selected: 'home'
    }
  },
  methods: {
    onChange(selectd){
      // console.log(selectd)
      // if(this.selected.indexOf(selectd)>=0){
      //   alert(selectd)
      // }
    }
  },
  watch: {
    selected(newVal){
      console.log(newVal)
    }
  }
};
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
