<!--  -->
<template>
  <div class="table-wrapper" :class="isDark ? 'dark-mode' : ''">
    <Table border ref="table" :columns="columns" :data="tableData" no-data-text="No Data" v-if="refreshTable"
      :size="tableSize" class="table" :row-class-name="rowClassName">
      <template #admin="{ row, index }">
        <el-switch v-model="row.isAdmin" @change="switchUpdate(row, index)"
          :style="isDark ? '--el-switch-off-color: #4c4d4f; --el-switch-on-color: #7F5CD9;' : ''"></el-switch>
      </template>
      <template #active="{ row, index }">
        <el-switch v-model="row.isActive" @change="switchUpdate(row, index)"
          :style="isDark ? '--el-switch-off-color: #4c4d4f; --el-switch-on-color: #7F5CD9;' : ''"></el-switch>
      </template>
      <template #action="{ index }">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleViewUser(index)">View</Button>
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import {getViewportSize} from '@/utils/basic'

import { mapState, mapActions } from "pinia";
import { useSystemStore } from "../store/system";
import api from '@/request/api'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // tableWidth: 1000,
      tableSize: undefined, // will switch from small/large/undefined, if set to "" will cause error
      columns: [
        {
          title: 'Username',
          key: 'username',
          sortable: true,
          fixed: 'left',
          minWidth: 150,
          resizable: true,
        },
        {
          title: 'Created Date',
          key: 'createdDate',
          sortable: true,
          minWidth: 150,
          resizable: true,
        },
        {
          title: 'Admin',
          slot: 'admin',
          key: 'isAdmin',
          sortable: true,
          minWidth: 150,
          resizable: true,
        },
        {
          title: 'Active',
          slot: 'active',
          key: 'isActive',
          sortable: true,
          minWidth: 150,
          resizable: true,
        },
        {
          title: 'Action',
          slot: 'action',
          minWidth: 160,
          align: 'center',
          resizable: true,
        }
      ],
      tableData: [
        {
          username: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          createdDate: '2016-10-03',
          status: 'Enable'
        },
        {
          username: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          createdDate: '2016-10-01',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
        {
          username: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          createdDate: '2016-10-02',
          status: 'Enable'
        },
        {
          username: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          createdDate: '2016-10-04',
          status: 'Enable'
        },
      ],
      refreshTable: true,
    };
  },
  props: {
    vw: {
      type: Number,
      default: undefined
    },
    vh: {
      type: Number,
      default: undefined
    },
    isDark: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState(useSystemStore, ["userinfo", "shouldUserListShow"]),
  },
  //监控data中的数据变化
  watch: {
    vw: {
      handler: function () {
        this.setTableSize();
        // console.log("watch 'val'", val);
      },
      immediate: false, //组件创建时是否触发此函数
      deep: false, //是否深度监听
    },

    isDark: {
      handler: function (newval) {
        if (!newval) {
          this.rowClassName();
        }
      },
    }
  },
  //方法集合
  methods: {
    ...mapActions(useSystemStore, ["set_userinfo", "set_shouldUserListShow"]),

    setTableSize() {
      this.tableSize = this.calTableSize(this.vw)
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

    handleViewUser(index) {
      // store selected user info to pinia
      this.set_userinfo(this.tableData[index]);

      // jump to selected user info page
      this.$router.push("/settings/user-info")

      // this.set_shouldUserListShow(false);
    },

    remove(index) {
      // delete from backend
      // this.deleteSelection(this.tableData[index].id)

      // delete from frontend
      this.tableData.splice(index, 1);
    },

    // delete selected table row from backend
    deleteSelection(id) {
      // confirm prompt
      this.$confirm('Confirm to Delete?', 'Delete', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // check id exists
        if (typeof id === "string") {
          // if exists, call deletion
          api.userAPI.deleteUser(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
              this.refreshPage();
              this.$message({
                type: 'success',
                message: 'Delete Success'
              });
            }
            // handle call api failure
            else {
              this.refreshPage();
              this.$message({
                type: 'warning',
                message: 'Error: Delete Fail'
              });
            }
          })
        } else {
          // this part unfinished - Oct 23
          // console.log(this.tableData);
          for (let i = 0; i < this.tableData.length; i++) {
            this.chartDisplayData = this.chartDisplayData.filter((item) => item.username !== this.chartSelection[i].username);
            api.userAPI.deleteUser(this.chartSelection[i].id).then(res => {
              console.log(res.status);
              if (res.status === 200) {
                this.refreshPage();
                this.$message({
                  type: 'success',
                  message: 'Delete Success'
                });
              } // if status is not 200, show an error message
              else {
                this.refreshPage();
                this.$message({
                  type: 'warning',
                  message: 'Error: Delete Fail'
                });
              }
            })
          }
        }
      }).catch(() => {
        this.refreshPage();
        this.$message({
          type: 'info',
          message: 'Cancel Delete'
        });
      });

    },

    rowClassName() {
      if (this.isDark)
        return 'table-dark-mode'
      else
        return ''
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setTableSize();
  },
  beforeCreate() {
  }, //生命周期 - 创建之前
  beforeMount() {
  }, //生命周期 - 挂载之前
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
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
