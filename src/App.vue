<template>
  <div id="app">
    <!-- 上中下 -->
    <!-- <li-container style="height:100vh;">
      <li-header class="demo">header</li-header>
      <li-main class="demo">main</li-main>
      <li-footer class="demo">footer</li-footer>
    </li-container> -->

    <!-- 上  下 -->
    <!-- <li-container style="height:100vh;">
      <li-aside>aside</li-aside>
      <li-main class="demo">main</li-main>
    </li-container> -->

    <!-- 上 中(左aside右main) 下 -->
    <!-- <li-container style="height:100vh;">
      <li-header class="demo">header</li-header>
      <li-container>
        <li-aside class="demo">aside</li-aside>
        <li-main class="demo">main</li-main>
      </li-container>
      <li-footer class="demo">footer</li-footer>
    </li-container> -->

    <!-- slide最左侧 -->
    <li-container>
      <li-aside width="60px">aside</li-aside>
      <li-container style="height:100vh;">
        <li-header height="300px">header</li-header>
        <li-main class="demo">main</li-main>
        <li-footer height="600px" class="demo">footer</li-footer>
      </li-container>
    </li-container>
  </div>
</template>

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
.demo {
  border: 1px solid #666;
  min-height: 100px;
}
</style>
