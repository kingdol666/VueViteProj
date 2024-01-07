<template>
  <div class="login">
    <!-- <img src="../images/1.png" alt="Image" class="m-img" /> -->
    <div class="loginPart">
      <h2>用户登录</h2>
      <el-form>
        <div class="inputElement">
          <el-input v-model="username" placeholder="请输入用户名/手机号 "></el-input>
        </div>
        <div class="inputElement">
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </div>
        <div>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
        <div style="text-align: right; color: white">
          <el-link type="warning">没有账号？去注册</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const username = ref("");
const password = ref("");
const router = useRouter();
const login = async () => {
  var formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  console.log(formData.get("password"));
  const response = await axios.post("/api/verify", formData);
  const newText = response.data;
  const stateCode = newText["code"];
  console.log(stateCode);
  // //记住密码
  if (stateCode === 1) {
    localStorage.setItem("token", "666");
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("id", newText["id"]);
    router.push("/home");
    //跳转首页
  } else {
    alert("用户名或者密码错误");
  }
};
onMounted(() => {
  router.push("/home");
});
</script>

<style scoped>
.loginPart {
  position: absolute;
  top: 300%;
  left: 250%;
  transform: translate(-50%, -50%);
  width: 300%;
  height: 250%;
  padding: 80px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
}

.loginPart h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.loginPart .inputbox {
  position: relative;
}

.loginPart .inputElement input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.inputElement {
  margin-bottom: 20px; /* Set the desired margin value */
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0%;
  width: 100%;
  height: 100%;
}
</style>
