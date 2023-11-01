<template>
  <el-button ref="buttonRef" v-click-outside="onClickOutside">关于项目</el-button>

  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="关于本案例"
    virtual-triggering
  >
    <span> 此项目是一个练习项目 </span>
    <span> 使用flask加vite-vue框架实现</span>
    <span> 用户上传一张图片可以根据图片写一首诗 </span>
    <span> 使用的是开源的诗歌模型和图片识别模型和星火ai </span>
    <span> 也应用了websocket-io 可以实现服务器和客户端的对话</span>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>
