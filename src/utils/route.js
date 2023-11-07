import { createRouter, createWebHistory } from "vue-router";
import Menu from "../components/headmenu.vue";
import chatToXH from "../components/ChatRobot.vue";
import ChatToShici from "../components/HelloWorld.vue";
import ChatDemo from "../components/chatDemo.vue";
import ImageCreate from "../components/ImageCreate.vue";
const routes = [
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
    children: [
      {
        path: "/chat",
        name: "chat",
        component: chatToXH,
      },
      { path: "/shici", name: "shici", component: ChatToShici },
      { path: "/chatsocket", name: "ChatDemo", component: ChatDemo },
      { path: "/imagecreate", name: "ImageCreate", component: ImageCreate },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/LoginPage.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/MainWindow.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/MainWindow.vue"),
  },
];
// createRouter创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 设置vue拦截器
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  if (to.path == "/login" && token == "666") {
    next("/home");
  } // 判断是否已经登陆
  if ((!token || token !== "666") && to.path !== "/login") {
    next("/login"); // Redirect to login page if token is not present or not equal to 666
  } else if (!router.hasRoute(to.name)) {
    next("/home"); // Redirect to home page if there is no valid path
  } else {
    next(); // Proceed to the next route
  }
});
// 最后导出。es6的模块化方式
export default router;
