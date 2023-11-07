import { createApp } from 'vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from "./utils/route";
import 'ant-design-vue/dist/reset.css';
const app = createApp(App);
app.use(ElementPlus).use(Antd).use(router);
app.mount("#app");

import SvgIcon from "./utils/SvgIcon.vue";
app.component("svg-icon", SvgIcon);
