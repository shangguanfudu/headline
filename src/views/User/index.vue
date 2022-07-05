<template>
  <div class="user-profile">
    <input type="file" hidden ref="inputFile" @change="inputChange" />
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isShowUpdateName = true"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isShowUpdateGender = true"
      :value="user.gender ? '女' : '男'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isShowUpdateBirthdy = true"
      :value="user.birthday || '1977-00-00'"
      is-link
    />

    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isShowUpdateAvatar"
      style="height: 100%"
      position="bottom"
    >
      <UpdateAvatar
        v-if="isShowUpdateAvatar"
        @update-avatar="user.photo = $event"
        :img="img"
        @close="isShowUpdateAvatar = false"
      ></UpdateAvatar>
    </van-popup>
    <!-- 编辑头像弹层 -->
    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isShowUpdateName"
        v-model="user.name"
        @close="isShowUpdateName = false"
      ></UpdateName>
    </van-popup>
    <!-- 编辑昵称弹层 -->

    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <UpdateGender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <UpdateBirthday
        v-if="isShowUpdateBirthdy"
        v-model="user.birthday"
        @close="isShowUpdateBirthdy = false"
      ></UpdateBirthday>
    </van-popup>
    <!-- 编辑生日弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdateAvatar from './components/UpdateAvatar.vue'
export default {
  name: 'userProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdateAvatar },
  data () {
    return {
      user: {},
      img: '',
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
      isShowUpdateAvatar: false
    }
  },

  created () {
    this.loadProfile()
  },

  methods: {
    async loadProfile () {
      try {
        const res = await getUserProfile()
        this.user = res.data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    inputChange () {
      // 获取上传文件
      const file = this.$refs.inputFile.files[0]
      // console.log(file)
      this.img = window.URL.createObjectURL(file)
      // console.log(this.img)
      this.isShowUpdateAvatar = true
      this.$refs.inputFile.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
