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
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>
    <el-button class="ml-3" type="warning" @click="Clear">Clear This Picture</el-button>
    <template #tip>
      <div class="el-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { genFileId } from "element-plus";
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
</script>
