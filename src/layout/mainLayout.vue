<template>
  <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple" />
      <SideClick
    /></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><HelloWorld></HelloWorld>
      <div class="grid-content ep-bg-purple-light"
    /></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><ChatDemo></ChatDemo>
      <div class="grid-content ep-bg-purple"
    /></el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><FileLoad />
      <div class="grid-content ep-bg-purple-light"
    /></el-col>
  </el-row>
  <el-row :gutter="4">
    <el-col :xs="4" :sm="8" :md="16" :lg="20" :xl="24"
      ><ChatRobot></ChatRobot>
      <div class="grid-content ep-bg-purple"
    /></el-col>
  </el-row>
</template>
<script setup>
import SideClick from "../components/SideClick.vue";
import FileLoad from "../components/FileLoad.vue";
import ChatDemo from "../components/chatDemo.vue";
import ChatRobot from "../components/ChatRobot.vue";
import HelloWorld from "../components/HelloWorld.vue";
</script>
<style>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
