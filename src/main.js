import { createApp } from 'vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
const app = createApp(App);
app.use(ElementPlus).use(Antd);
app.mount("#app");
