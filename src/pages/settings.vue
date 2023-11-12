<!--  -->
<template>
  <div class="settings-body">
    <!--insert components here-->
    <!-- <UserList v-if="isAdmin" v-show="showUserList" :vw="vw" :vh="vh"></UserList> -->
    <UserList :vw="vw" :vh="vh" :isDark="isDarkMode"></UserList>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import UserList from "@/components/userList.vue"
import { getViewportSize } from "@/utils/basic";
import { mapState, mapActions } from "pinia";
import { useSystemStore } from "../store/system";

export default {
  
  //import引入的组件需要注入到对象中才能使用
  components: {
    UserList
  },
  data() {
    //这里存放数据
    return {
      vw: undefined,
      vh: undefined,
      showDetailedInfo: false,
      showUserList: true,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState(useSystemStore, ["userinfo", "shouldUserListShow", "isDarkMode"]),
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  //监控data中的数据变化
  watch: {
    isAdmin: {
      handler: function (newVal) {
        // if login as user, set user info show status to true
        this.handleCompDisplay();
      },
      immediate: false, // 组件创建时是否触发此函数
      deep: false, // 是否深度监听（当监听变量的内部属性时 eg对象内部的属性变化，数组元素变化，嵌套的对象/数组）
    },

    shouldUserListShow(newVal) {
      console.log(newVal);
      this.showUserList = newVal;
      this.showDetailedInfo = !newVal;
    },

    isDarkMode(newVal){
      // newVal = true or false
      this.toggleTableColorMode(newVal);
    }
  },
  //方法集合
  methods: {
    ...mapActions(useSystemStore, ["set_userinfo", "set_shouldUserListShow", "set_isDarkMode"]),

    // 已经验证能够拿到值
    setTableSize() {
      const [viewportWidth, viewportHeight] = getViewportSize();
      this.vw = viewportWidth;
      this.vh = viewportHeight;
    },

    handleCompDisplay() {
      this.showUserList = this.isAdmin;
      if (!this.isAdmin) {
        this.showDetailedInfo = true;
      }
    },

    // unfinished @23-10-25
    toggleTableColorMode(isDark){
      // isDark - Boolean indicatior
      console.log(isDark);
      // logic to change table color mode
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("admin?", this.isAdmin);
    // if user login, show user personal info
    this.handleCompDisplay();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setTableSize();
    window.addEventListener("resize", this.setTableSize);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    window.removeEventListener("resize", this.setTableSize);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* .settings-body {
  margin: 12px;
} */
</style>
