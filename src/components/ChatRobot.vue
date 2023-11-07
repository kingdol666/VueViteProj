<template>
  <div class="chat-box">
    <el-header class="header">
      <div>
        <img src="../assets/chat.png" alt="" />
        <span>星火API语言模型</span>
      </div>
    </el-header>
    <el-card class="message-list">
      <el-scrollbar>
        <div
          class="message"
          v-for="(message, index) in messages"
          :key="index"
          :class="{ 'align-right': message.self }"
        >
          <div class="message-content" :class="{ 'align-right': message.self }">
            <template v-if="!message.self">
              <div class="message-avatar">
                <img class="avatar" :src="message.avatar" alt="User Avatar" />
              </div>
              <div class="message-user">{{ message.user }}:</div>
              <div class="message-text">{{ message.text }}</div>
            </template>
            <template v-else>
              <div class="message-avatar">
                <img class="avatar" :src="message.avatar" alt="User Avatar" />
              </div>
              <div class="message-text-self1">我说的话:</div>
              <div class="message-text-self2">{{ message.text }}</div>
            </template>
          </div>
        </div>
      </el-scrollbar>
    </el-card>
    <div class="input-box">
      <el-input
        class="message-input"
        v-model="messageText"
        @keydown.enter="addMessage"
        placeholder="Enter your message..."
      ></el-input>
      <el-button type="primary" @click="addMessage">Send</el-button>
    </div>
    <el-button type="primary" @click="clearMessages">Clear</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Img from "../images/robot.jpg";
import UserImg from "../images/user.png";
import axios from "axios";
import {
  ElCard,
  ElScrollbar,
  ElInput,
  ElButton,
  ElMessageBox,
  ElMessage,
} from "element-plus";
import type { Action } from "element-plus";
const messages = ref([
  { user: "Me", self: true, text: "111", avatar: UserImg },
  { user: "XiaoMing", self: false, text: "222", avatar: Img },
]);
const messageText = ref("");
const openBox = (data: string) => {
  ElMessageBox.alert(data, "Message!", {
    confirmButtonText: "OK",
    callback: (action: Action) => {
      ElMessage({
        type: "info",
        message: `action: ${action}`,
      });
    },
  });
};
const sendToRobot = async (text: any) => {
  var formData = new FormData();
  formData.append("text", text);
  var textValue = formData.get("text");
  console.log(textValue);
  try {
    // 发送POST请求并携带表单数据
    const response = await axios.post("/api/get_xinghuo", formData);

    // 处理响应结果
    const newText = response.data["text"];
    console.log(newText);
    messages.value.push({
      user: "Robot",
      text: newText,
      self: false,
      avatar: Img,
    });
  } catch (error) {
    console.error(error);
  }
};
const addMessage = () => {
  if (messageText.value.trim() !== "") {
    const newMessage = {
      user: "Me",
      self: true,
      text: messageText.value,
      avatar: UserImg,
    };
    messages.value.push(newMessage);
    sendToRobot(messageText.value);
    messageText.value = "";
  }
};
const clearMessages = () => {
  messages.value = [];
};
</script>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: auto;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  display: flex;
  margin: 4px 0;
}

.avatar {
  width: 50px; /* Adjust the width as per your requirement */
  height: 50px; /* Adjust the height as per your requirement */
}
.align-right {
  justify-content: flex-end;
  font-family: "Arial", sans-serif;
}

.message-text-self1 {
  color: rgb(0, 166, 255);
}

.message-text-self2 {
  color: red;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding: 6px 10px;
  background-color: #d9edf7;
  border-radius: 15px;
}

.message-user {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 7px;
  color: rgb(32, 180, 146);
}

.message-text {
  font-size: 14px;
  color: #c61818;
}

.input-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}

.input-box input {
  flex: 1;
  margin-right: 10px;
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.input-box button {
  padding: 6px 20px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input-box button:hover {
  background-color: #388e3c;
}
.header {
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  align-items: center;
}

.header img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.header span {
  font-size: 18px;
  font-weight: bold;
  color: darkred;
}
</style>
