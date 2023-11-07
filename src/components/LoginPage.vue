<template>
  <!-- 登录页头部 start -->
  <div class="login-top">
    <img src="../assets/vue.svg" class="icon-head" alt="" />
    <div class="login-top-centent">欢迎登录</div>
    <div class="title-name">我的小小Demo</div>
  </div>
  <!-- 登录页头部 end -->
  <!-- 登录页面主体 start -->
  <div class="login-body">
    <!-- 用户名 -->
    <div class="field">
      <svg-icon icon-name="wo" class-name="icon" />
      <input type="text" placeholder="请输入用户名(默认admin)" v-model="username" />
    </div>
    <!-- 密码 -->
    <div class="field">
      <svg-icon icon-name="mima" class-name="icon" />
      <input type="password" placeholder="请输入密码(默认123456)" v-model="password" />
    </div>
    <!-- 记住密码 -->
    <div class="field-check">
      <input
        type="checkbox"
        class="checkbox"
        id="remberpwd"
        value="记住密码"
        v-model="remberpwd"
      />
      <label class="checkbox-lable" for="remberpwd">记住密码</label>
    </div>
    <!-- 登录按钮 -->
    <button class="login" @click="login">登录</button>
    <div>
      <button class="register" @click="register">注册</button>
    </div>
  </div>
  <!-- 登录页面主体 end -->
</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";

//引入路由
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "app",
  setup() {
    const state = reactive({
      username: null, //用户名
      password: null, //密码
      remberpwd: false, //记住密码
    });
    const router = useRouter();
    // 页面初始化时，赋值用户名密码
    onMounted(() => {
      console.log(localStorage);
      if (localStorage.getItem("username")) {
        state.username = localStorage.getItem("username");
        state.password = localStorage.getItem("password");
        state.remberpwd = true;
      }
    });
    // 记住密码
    watch(
      () => state.remberpwd,
      (val) => {
        remberPassword(val);
      }
    );
    //记住密码
    const remberPassword = (val) => {
      if (val === true) {
        localStorage.setItem("username", state.username);
        localStorage.setItem("password", state.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    };
    // 验证用户名密码
    const login = async () => {
      var formData = new FormData();
      formData.append("username", state.username);
      formData.append("password", state.password);
      console.log(formData.get("username"));
      const response = await axios.post("/api/verify", formData);
      const newText = response.data;
      const stateCode = newText["code"];
      console.log(stateCode);
      // //记住密码
      if (stateCode === 1) {
        localStorage.setItem("token", "666");
        localStorage.setItem("username", state.username);
        localStorage.setItem("password", state.password);
        localStorage.setItem("id", newText["id"]);
        //跳转首页
        router.push("/home");
      } else {
        alert("用户名或者密码错误");
      }
    };

    const register = async () => {
      var formData = new FormData();
      formData.append("username", state.username);
      formData.append("password", state.password);
      const response = await axios.post("/api/user/create", formData);
      console.log(formData.get("username"));
      console.log(response.data);
    };
    return {
      ...toRefs(state),
      login,
      register,
    };
  },
};
</script>

<style scoped>
/**头部内容 */
.login-top {
  height: 200px;
  background: linear-gradient(to right, rgba(0, 0, 240, 0.5), rgba(94, 94, 233, 0.5));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50% / 0 0 20% 20%;
  font-weight: bold;
}
/**文本头部内容 */
.icon-head {
  width: 40px;
  float: clear;
}
.login-top-centent {
  padding-top: 10px;
  text-align: center;
  color: #ffffff;
  font-size: 30px;
}
.title-name {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: purple;
  margin-top: 20px;
}
/**主体内容 */
.login-body {
  margin: 0 auto;
  margin-top: -20px;
  width: 85%;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 10px;
  padding: 60px 0;
  height: calc(100% - 200px);
}
.register {
  width: 70%;
  margin-top: 30px;
  border: 0px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 0, 240, 0.5);
  color: #ffffff;
  background-color: green;
  color: white;
}
.field {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  border-bottom: 1px solid rgb(204, 203, 203);
  /* 图标输入框对齐 */
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.icon {
  font-size: 22px;
  color: rgba(0, 0, 240, 0.5);
}
input {
  border: 0;
  font-size: 13px;
}
input::-webkit-input-placeholder {
  color: rgba(0, 0, 240, 0.5);
  font-size: 13px;
}
input:focus {
  /* 边框不用border，用outline */
  outline: 0px;
}
/* 多选框 */
.field-check {
  margin: 0 auto;
  margin-top: 10px;
  width: 70%;
  text-align: right;
}
.checkbox-lable {
  padding-left: 5px;
  cursor: pointer;
  margin: 0;
  vertical-align: middle;
  font-size: 13px;
}
.checkbox {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* css 复选框 */
input[type="checkbox"] {
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]::after {
  position: absolute;
  top: 0;
  background-color: #fff;
  color: #1c4882;
  width: 14px;
  height: 14px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  border-radius: 2px;
  box-sizing: border-box;
  border: 1px solid #ddd;
}

input[type="checkbox"]:checked::after {
  content: "";
  background-color: rgba(94, 94, 233, 0.5);
  /* border-color: rgba(94, 94, 233, 0.5); */
}

input[type="checkbox"]:checked::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 5px;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  z-index: 1;
}

/* 登录按钮 */
.login {
  width: 70%;
  margin-top: 30px;
  border: 0px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 0, 240, 0.5);
  color: #ffffff;
}
button:focus {
  /* 边框不用border，用outline */
  outline: 0px;
}
</style>
