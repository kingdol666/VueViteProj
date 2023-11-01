<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="./assets/vue.svg" alt="" />
          <span>聊天系统测试案例</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-main>
        <Layout></Layout>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import Layout from "./layout/mainLayout.vue";
</script>
<style scoped>
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
}
</style>
