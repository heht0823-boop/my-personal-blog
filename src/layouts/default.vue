<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-header class="layout-header"> header </el-header>
      <el-main class="layout-main"> <div class="test"></div></el-main>
      <el-footer class="layout-footer"> footer </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
}

.layout-container {
  height: 100%;
}

.layout-header {
  height: 60px;
  padding: 0;
}

.layout-main {
  flex: 1;
  overflow: auto;
}

.layout-footer {
  height: 60px;
}
</style>
