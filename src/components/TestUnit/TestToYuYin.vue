<template>
  <el-row :gutter="100">
    <el-col :span="6"
      ><div class="grid-content ep-bg-purple" />
      <h1>文本到语音</h1>
      <div class="inputElement">
        <el-input v-model="text" placeholder="请输入您要转换的文字"></el-input>
        <el-button type="primary" @click="sendRequest">确认</el-button>
      </div></el-col
    >
    <el-col :span="6"
      ><div class="grid-content ep-bg-purple" />
      <div>
        <h1 class="title">当前转换后语音</h1>

        <iframe
          :src="embeddedPageLink"
          ref="text2"
          :width="500"
          :height="300"
          frameborder="10"
          marginheight="10"
          marginwidth="10"
        >
          Your browser does not support iframes.
        </iframe>
      </div></el-col
    >
    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const text = ref("");
var newUrl = "";
var embeddedPageLink = ref(newUrl);
const sendRequest = async () => {
  console.log(text.value);
  var formData = new FormData();
  formData.append("text", text.value);
  const response = await axios.post("/api/getYuYin", formData);
  console.log(response.data.data.Data.output_wav);
  newUrl = response.data.data.Data.output_wav;
  embeddedPageLink.value = newUrl;
};
</script>
