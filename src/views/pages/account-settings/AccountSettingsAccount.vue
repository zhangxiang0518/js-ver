<script setup>

// const accountData = {
//   avatarImg: avatar1,
//   firstName: 'john',
//   lastName: 'Doe',
//   email: 'johnDoe@example.com',
//   phone: '+1 (917) 543-9876',
//   address: '123 Main St, New York, NY 10001',
//   state: 'New York',
//   zip: '10001',
//   country: 'USA',
// }

const refInputEl = ref()
// const accountDataLocal = ref(structuredClone(accountData))
// const isAccountDeactivated = ref(false)

// const resetForm = () => {
//   accountDataLocal.value = structuredClone(accountData)
// }

// const changeAvatar = file => {
//   const fileReader = new FileReader()
//   const { files } = file.target
//   if (files && files.length) {
//     fileReader.readAsDataURL(files[0])
//     fileReader.onload = () => {
//       if (typeof fileReader.result === 'string')
//         accountDataLocal.value.avatarImg = fileReader.result
//     }
//   }
// }

// // reset avatar image
// const resetAvatar = () => {
//   accountDataLocal.value.avatarImg = accountData.avatarImg
// }
</script>

<script>
import avatar1 from '@images/avatars/avatar-1.png'
import { mapState, mapActions } from "pinia"
import { useSystemStore } from "@/store/system"

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      accountData: {
        avatarImg: avatar1,
        firstName: 'john',
        lastName: 'Doe',
        email: 'johnDoe@example.com',
        phone: '+1 (917) 543-9876',
        address: '123 Main St, New York, NY 10001',
        state: 'New York',
        zip: '10001',
        country: 'USA',
      },
      accountDataLocal: undefined,
      isAccountDeactivated: false,
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(useSystemStore, ["userinfo", "shouldUserListShow"]),
  },
  // 从父组件向子组件传递数据
  // 传入的prop放在这里 这里写的变量不用在data中声明
  props: {
    // something: {
    //   type: Number,
    //   default: undefined
    // },
    firstName: {
      type: String,
      default: undefined,
    },
    lastName: {
      type: String,
      default: undefined,
    },
    email: {
      type: String,
      default: undefined,
    },
    phone: {
      type: String,
      default: undefined,
    },
    address: {
      type: String,
      default: undefined,
    },
    state: {
      type: String,
      default: undefined,
    },
    zip: {
      type: String,
      default: undefined,
    },
    country: {
      type: String,
      default: undefined,
    },
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
  methods: {
    ...mapActions(useSystemStore, ["set_userinfo", "set_shouldUserListShow"]),

    resetForm() {
      accountDataLocal = JSON.parse(JSON.stringify(this.accountData));
    },

    changeAvatar(file) {
      const fileReader = new FileReader();
      const files = file.target.files;

      if (files && files.length) {
        fileReader.readAsDataURL(files[0]);
        var that = this;
        fileReader.onload = function () {
          if (typeof fileReader.result === 'string') {
            console.log(that.accountDataLocal);
            that.accountDataLocal.avatarImg = fileReader.result;
          }
        };
      }
    },

    resetAvatar() {
      this.accountDataLocal.avatarImg = this.accountData.avatarImg;
    },

    fillAccountData() {
      this.accountData.firstName = this.userinfo.username;
    },

  }, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  }, // 生命周期 - 创建之前
  created() {
    this.fillAccountData();
    this.accountDataLocal = JSON.parse(JSON.stringify(this.accountData));
  }, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, // 生命周期 - 挂载之前
  mounted() {
    // console.log(accountData);
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
  }, // 生命周期 - 销毁之前（可以取消订阅、解绑事件）
  destroyed() {
  }, // 生命周期 - 销毁完成
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="accountDataLocal.avatarImg" />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar">

              <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="bx-refresh" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.firstName" placeholder="John" label="First Name" />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.lastName" placeholder="Doe" label="Last Name" />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.email" label="E-mail" placeholder="johndoe@gmail.com"
                  type="email" />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.phone" label="Phone Number" placeholder="+1 (917) 543-9876" />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.address" label="Address"
                  placeholder="123 Main St, New York, NY 10001" />
              </VCol>

              <!-- 👉 State -->
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.state" label="State" placeholder="New York" />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.zip" label="Zip Code" placeholder="10001" />
              </VCol>

              <!-- 👉 Country -->
              <VCol cols="12" md="6">
                <VSelect v-model="accountDataLocal.country" label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']" placeholder="Select Country" />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn>Save changes</VBtn>

                <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Account -->
      <VCard title="Deactivate Account">
        <VCardText>
          <div>
            <VCheckbox v-model="isAccountDeactivated" label="I confirm my account deactivation" />
          </div>

          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
