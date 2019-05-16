<template>
  <div class="app-container">
    <div class="learn-menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">公告</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">评分标准</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">课件</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">测验与作业</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">考试</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-question"></i>
          <span slot="title">讨论区</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="learn-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.app-container {
  width: 98%;
  margin: 0 auto;
  overflow: hidden;
}
.learn-menu {
  float: left;
  width: 25%;
}
.learn-content {
  float: right;
  width: 70%;
}

</style>
