<template>
  <li-nav
    :selected.sync="selected"

  >
    <li-nav-item name="home">首页</li-nav-item>
    <!-- <li-nav-item name="about">关于</li-nav-item> -->
    <li-sub-nav>
      <template slot="title">关于</template>
      <li-nav-item name="culture">企业文化</li-nav-item>
      <li-nav-item name="develops">开发团队</li-nav-item>
      <li-nav-item name="contacts">联系电话</li-nav-item>
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
      selected: ['home']
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
