<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="grid-content ep-bg-purple" />
        <SideClick
      /></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="9"
        ><HelloWorld></HelloWorld>
        <div class="grid-content ep-bg-purple-light"
      /></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="9"
        ><ChatDemo></ChatDemo>
        <div class="grid-content ep-bg-purple"
      /></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"
        ><FileLoad />
        <div class="grid-content ep-bg-purple-light"
      /></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
        ><ChatRobot></ChatRobot>
        <div class="grid-content ep-bg-purple"
      /></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
        ><ImageCreate></ImageCreate>
        <div class="grid-content ep-bg-purple"
      /></el-col>
    </el-row>
  </div>
</template>
<script setup>
import ImageCreate from "../components/ImageCreate.vue";
import SideClick from "../components/SideClick.vue";
import FileLoad from "../components/FileLoad.vue";
import ChatDemo from "../components/chatDemo.vue";
import ChatRobot from "../components/ChatRobot.vue";
import HelloWorld from "../components/HelloWorld.vue";
</script>
<style>
.el-col {
  border-radius: 6px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.loginContent {
  height: auto;
}

.container {
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust this value as needed */
}
</style>
