<!--  -->
<template>
  <div class=""></div>
</template>
  
  <script>
/**
 * v1.1  Edited by Tyler
 */

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import { mapState, mapActions } from "pinia";
import { useSystemStore } from "../store/system";
const store = useSystemStore();

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  // 监听属性 类似于data概念
  computed: {},
  // 从父组件向子组件传递数据
  // 传入的prop放在这里 这里写的变量不用在data中声明
  props: {
    // something: {
    //   type: Number,
    //   default: undefined
    // },
  },
  // 监控data中的数据变化
  watch: {
    // something: {
    //   handler: function () {
    //     this.doSomething();
    //   },
    //   immediate: false, // 组件创建时是否触发此函数
    //   deep: false, // 是否深度监听（当监听变量的内部属性时 eg对象内部的属性变化，数组元素变化，嵌套的对象/数组）
    // },
  },
  // 方法集合
  methods: {}, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, // 生命周期 - 创建之前
  created() {}, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, // 生命周期 - 挂载之前
  mounted() {},
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  activated() {}, // 如果页面有keep-alive缓存功能，在组件被激活时触发
  deactivated() {}, // 如果页面有keep-alive缓存功能，在组件被停用时触发
  beforeDestroy() {}, // 生命周期 - 销毁之前（可以取消订阅、解绑事件）
  destroyed() {}, // 生命周期 - 销毁完成
};
</script>
  <style scoped></style>
  <style></style>
  