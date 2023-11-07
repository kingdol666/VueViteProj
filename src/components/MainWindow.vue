<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/vue.svg" alt="" />
          <span>聊天系统测试案例</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-main>
        <Layout></Layout>
      </el-main>
      <el-footer><Footer></Footer></el-footer>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Footer from "../components/Footer.vue";
import Layout from "../layout/mainLayout.vue";
import router from "../utils/route";
const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
  location.reload();
};
</script>
<style>
.headers {
  background-color: #692525;
  margin: auto;
}

.el-header {
  background-color: #363d40;

  display: flex;

  justify-content: space-between;

  align-items: center;

  color: #fff;

  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.common-layout {
  height: 100vh;
  overflow-y: auto;
}
.el-main {
  height: calc(100% - 64px); /* Adjust this value based on your layout */
}
</style>
