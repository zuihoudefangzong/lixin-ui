<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<style lang="scss" scoped>
.main {
  // 占满优先级会高于css给定的width
  flex-grow: 1;
}
</style>