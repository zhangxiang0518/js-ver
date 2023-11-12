<!--  -->
<template>
  <div class="table-wrapper" :class="isDarkMode ? 'dark-mode' : ''">
    <Table border ref="table" :columns="columns" :data="tableData" no-data-text="No Data" :size="tableSize" class="table"
      :row-class-name="rowClassName">

      <!-- switch column -->
      <template #active="{ row, index }">
        <el-switch v-model="row.active" @change="switchUpdate(row, index)"
          :style="isDarkMode ? '--el-switch-off-color: #4c4d4f; --el-switch-on-color: #7F5CD9;' : ''"></el-switch>
      </template>
    </Table>
  </div>
</template>

<script>
import { getViewportSize } from '@/utils/basic'
import { mapState } from "pinia";
import { useSystemStore } from "../store/system";
// import api from '@/request/api'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      vw: undefined,
      tableSize: undefined, // will switch from small/large/undefined, if set to "" will cause error
      columns: [
        {
          title: 'Parameters',
          key: 'parameters',
          sortable: true,
          align: 'center',
          resizable: true,
        },
        {
          title: 'Active',
          slot: 'active',
          key: 'isActive',
          sortable: true,
          resizable: true,
          align: 'center',
        },
      ],
      tableData: [
        {
          parameters: 'Temperature',
          active: true,
        },
        {
          parameters: 'Humidity',
          active: false,
        },
        {
          parameters: 'Wind Speed',
          active: true,
        },
      ],
      // refreshTable: true,
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(useSystemStore, ["isDarkMode"]),
  },
  // 从父组件向子组件传递数据
  // 传入的prop放在这里 这里写的变量不用在data中声明
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
  },
  // 监控data中的数据变化
  watch: {
    vw: {
      handler: function () {
        this.setTableSize();
      },
      immediate: false,
      deep: false,
    },
  },
  // 方法集合
  methods: {
    setTableSize() {
      this.tableSize = this.calTableSize(this.vw)
    },

    setSize() {
      const [viewportWidth, viewportHeight] = getViewportSize();
      this.vw = viewportWidth;
    },

    calTableSize(vw) {
      var drawerWidth;
      if (vw < 992) {
        drawerWidth = "small"
      } else if (vw >= 992 && vw < 1200) {
        drawerWidth = ""
      } else {
        drawerWidth = "large"
      }
      return drawerWidth;
    },

    rowClassName() {
      if (this.isDarkMode)
        return 'table-dark-mode'
      else
        return ''
    },

    switchUpdate() {
      // logic for handle switch value update
    }
  }, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  }, // 生命周期 - 创建之前
  created() {
  }, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, // 生命周期 - 挂载之前
  mounted() {
    this.setTableSize();
    this.setSize();
    window.addEventListener("resize", this.setSize);
  },
  beforeUpdate() {
  }, // 生命周期 - 更新之前
  updated() {
  }, // 生命周期 - 更新之后
  activated() {
  }, // 如果页面有keep-alive缓存功能，在组件被激活时触发
  deactivated() {
  }, // 如果页面有keep-alive缓存功能，在组件被停用时触发
  beforeDestroy() {
    window.removeEventListener("resize", this.setSize);
  }, // 生命周期 - 销毁之前（可以取消订阅、解绑事件）
  destroyed() {
  }, // 生命周期 - 销毁完成
};
</script>
<style scoped>
.table {
  border-radius: 10px;
  box-shadow: 0 2px 9px -2px var(--v-shadow-key-umbra-opacity),
    0 4px 9px 1px var(--v-shadow-key-penumbra-opacity),
    0 2px 6px 4px var(--v-shadow-key-ambient-opacity);
  /* border: 1px solid rgb(221, 222, 226); */
}
</style>

<style>
.ivu-table .table-dark-mode td {
  background-color: #070707;
  color: #dbdbebb3;
  border: 1px solid #222;
}

.dark-mode .ivu-table th {
  background-color: #120c20;
  color: #dbdbebb3;
  border: 1px solid #222;
}

.dark-mode .ivu-table-header th {
  color: #dbdbebb3;
  font-weight: bold;
  background-color: #120c20;
  border: 1px solid #222;
}

.dark-mode .ivu-table-wrapper {
  border: none;
}

.dark-mode .ivu-table:before {
  background-color: #070707;
}

.dark-mode .ivu-table:after {
  background-color: #070707;
}
</style>

