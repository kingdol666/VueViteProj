import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const socket = ref(null);

    onMounted(() => {
      socket.value = new WebSocket("ws://your-websocket-server-url");

      socket.value.onopen = () => {
        console.log("WebSocket 连接已打开");
      };

      socket.value.onmessage = (event) => {
        console.log("收到消息：", event.data);
      };

      socket.value.onclose = () => {
        console.log("WebSocket 连接已关闭");
      };

      socket.value.onerror = (error) => {
        console.error("WebSocket 错误：", error);
      };
    });

    onUnmounted(() => {
      if (socket.value) {
        socket.value.close();
      }
    });

    return {
      socket,
    };
  },
};
