<template>
  <div class="chat-box">
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

<script>
import axios from "axios";
import Img from "../images/robot.jpg";
import UserImg from "../images/user.png";
export default {
  data() {
    return {
      messages: [
        { user: "小明", text: "你好啊", self: false, avatar: Img },
        { user: "", text: "你好", self: true, avatar: UserImg },
      ],
      messageText: "",
    };
  },
  methods: {
    test2() {
      this.messages = []; // Clear the messages array
    },
    async getBackData() {
      var formData = new FormData();
      formData.append("text", this.messageText);
      var textValue = formData.get("text");
      console.log(textValue);
      try {
        // 发送POST请求并携带表单数据
        const response = await axios.post("/api/get_shici", formData);

        // 处理响应结果
        const newText = response.data["text"];
        console.log(newText);
        this.messages.push({
          user: "Robot",
          text: newText,
          self: false,
          avatar: Img,
        });
      } catch (error) {
        console.error(error);
      }
    },
    addMessage() {
      if (!this.messageText) return;
      this.getBackData();

      this.messages.push({
        user: "",
        text: this.messageText,
        self: true,
        avatar: UserImg,
      });
      this.messageText = "";
    },
  },
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

.avatar {
  width: 50px; /* Adjust the width as per your requirement */
  height: 50px; /* Adjust the height as per your requirement */
}
.message {
  display: flex;
  margin: 4px 0;
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
</style>
