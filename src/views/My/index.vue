<template>
  <div>
    <!-- 已登录 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button" @click="$router.push({ name: 'user' })">
          编辑资料
        </div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header header-unlog" v-else>
      <div class="inner" @click="$router.push({ name: 'login' })">
        <img src="@/assets/images/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <!-- 收藏历史 -->
    <div class="gird-wrap">
      <van-grid :column-num="2">
        <van-grid-item icon="star-o" text="收藏">
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
        </van-grid-item>
        <van-grid-item icon="clock-o" text="历史">
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- more -->
    <van-cell-group inset>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <!-- 推出登录 -->
    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getInfo } from '@/api/user'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const { data: res } = await getInfo()
        // console.log(res)
        this.userInfo = res.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认是否退出' })
        this.$store.commit('SETUSER', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {}
}
</script>

<style scoped lang="less">
.header {
  width: 750px;
  height: 401px;
  background: url("@/assets/images/banner.png") no-repeat;
  background-size: cover;
}

.header-unlog {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  // vertical-align: bottom;
  img {
    margin-bottom: 15px;
    width: 132px;
    height: 132px;
    background-color: #ffffff;
    border: solid 2px #ffffff;
    border-radius: 50%;
  }
  p {
    width: 145px;
    height: 28px;
    font-size: 28px;
    color: #ffffff;
    padding: 0;
    margin: 0;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        height: 29px;
        font-size: 30px;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }
    .button {
      width: 116px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      color: #666666;
    }
  }
  .list {
    margin: 55px 0 30px;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #ffffff;
        &:first-child {
          font-size: 36px;
        }
        &:last-child {
          font-size: 23px;
        }
      }
    }
  }
}
.gird-wrap {
  .toutiao {
    font-size: 45px;
  }
  /deep/ .van-grid-item__text {
    font-size: 28px;
  }
  .van-grid-item {
    &:first-child {
      color: #eb5253;
    }
    &:last-child {
      color: #ff9d1d;
    }
  }
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
