<template>
  <el-button ref="buttonRef" type="primary" v-click-outside="onClickOutside"
    >关于项目</el-button
  >
  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="关于本案例"
    virtual-triggering
  >
    <span>此项目是一个练习项目</span>
    <span>使用flask加vite-vue框架实现</span>
    <span>用户上传一张图片可以根据图片写一首诗</span>
    <span>使用的是开源的诗歌模型和图片识别模型和星火ai</span>
    <span>也应用了websocket-io 可以实现服务器和客户端的对话</span>
  </el-popover>
  <el-card class="user" shadow="always" :body-style="{ padding: '0px' }">
    <div class="card-content">
      <div class="greeting">HELLO {{ username }}</div>
      <div class="online-count">当前在线人数: {{ UserCount }}</div>
    </div>
  </el-card>
  <el-card
    class="to-main"
    shadow="always"
    :body-style="{
      padding: '20px',
      textAlign: 'center',
      borderRadius: '10px',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }"
  >
    <el-button
      type="primary"
      @click="buttonclicktomain"
      style="border-radius: 20px; background-color: #409eff; color: #fff; font-size: 20px"
    >
      点我去项目主页
    </el-button>
  </el-card>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { onMounted } from "vue";
import socket from "../utils/socket";
import axios from "axios";
import { ClickOutside as vClickOutside } from "element-plus";
import router from "../utils/route";
const username = ref(localStorage.getItem("username"));
const buttonRef = ref();
const UserCount = ref("加载中");
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

const delay = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const buttonclicktomain = () => {
  alert("跳转成功");
  socket.disconnect();
  router.push("/chat");
};
const delayedExecution = async () => {
  await delay(1000); // Delay for 1 second
  getUserCount();
};
const getUserCount = async () => {
  const response = await axios.get("/api/usercount");
  const newText = response.data;
  if (newText["code"] === 0) {
    const usercount = newText["data"];
    UserCount.value = usercount;
  }
  console.log(newText);
};
onMounted(delayedExecution);
</script>
<style scoped>
.user {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.greeting {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
}
.online-count {
  font-size: 16px;
}
</style>
