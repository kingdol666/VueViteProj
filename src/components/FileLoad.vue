<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="BeforeUpload"
    :http-request="Upload"
    :limit="1"
    list-type="picture"
    @change="handleUploadChange"
    style="display: flex; justify-content: center; align-items: center"
  >
    <el-button
      type="primary"
      class="upload-button"
      size="medium"
      slot="trigger"
      style="background-color: purple; color: white"
    >
      点击上传图片
    </el-button>
  </el-upload>

  <el-button class="ml-3 clear-button" type="warning" @click="Clear">
    清理一下图片
  </el-button>
  <div>
    <el-button
      ref="buttonRef"
      v-click-outside="onClickOutside"
      class="generate-button"
      type="success"
      >关于图片生成诗句</el-button
    >
  </div>

  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="关于本案例"
    virtual-triggering
  >
    <span> 请选择你要生成对应诗句的图片 </span>
    <span> 选择后网站可以自动上传到后端进行图片解析并生成对应内容 </span>
    <span> 练习Demo! QAQ</span>
  </el-popover>
  <el-card class="user">
    <div class="greeting">贴心Tips {{}}</div>
    <div class="online-count">请上传解析完毕图片之后先将图片关闭在上传其他图片! {{}}</div>
  </el-card>
</template>

<script setup lang="ts">
import axios from "axios";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
const upload = ref<UploadInstance>();
const newFile = new FormData(); //   1. 定义一个newFile变量（FormData 对象）
const handleRemove = (file) => {
  console.log("move Success!");
};

const handleUploadChange = (files: UploadRawFile) => {
  console.log(files);
};
const Clear = () => {
  upload.value!.clearFiles();
};
const handlePreview = (file) => {
  console.log("handle preview");
};
const BeforeUpload = (file) => {
  if (file) {
    newFile.delete("file");
    newFile.append("file", file); //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中。
    console.log(newFile.get("file"));
  } else {
    return false;
  }
};
const Upload = () => {
  const newData = newFile; //  3. 拿到刚刚的数据，并将其传给后台
  console.log(newData.get("file"));
  axios({
    url: "/api/upload",
    method: "post",
    data: newData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      console.log("res:", res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

import { ref, unref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
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
  color: rebeccapurple;
}

.online-count {
  font-size: 16px;
}
.upload-button {
  font-size: 20px;
  width: 100%;
  margin-bottom: 10px;
}
.clear-button,
.generate-button {
  font-size: 20px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
