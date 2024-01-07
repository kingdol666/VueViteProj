<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    router
  >
    <el-menu-item index="0">
      <img style="width: 50px" src="@\assets\vue.svg" alt="Element logo" />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/">返回</el-menu-item>
    <el-sub-menu index="2">
      <template #title>菜单</template>
      <el-menu-item index="/chat">和机器人对话</el-menu-item>
      <el-menu-item index="/shici">诗词模型</el-menu-item>
      <el-menu-item index="/chatsocket">Socket聊天室加图片转文字</el-menu-item>
      <el-menu-item index="/imagecreate">文字生成图片</el-menu-item>
      <el-menu-item index="/textoyuyin">文本生成语音</el-menu-item>
      <!-- <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>
  </el-menu>
  <div><router-view></router-view></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import socket from "../utils/socket";
const activeIndex = ref("1");
socket.connect();
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
