<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar fixed>
        <template #title>
          <van-button type="info" round to="/search">
            <van-icon name="search" size="18" />搜索
          </van-button>
        </template>
      </van-nav-bar>
    </div>
    <!-- 导航 -->
    <van-tabs v-model="active" animated>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <ArticleList :id="obj.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <!-- 占位的menu -->
        <div class="menu2"></div>
      </template>
    </van-tabs>

    <van-popup
      v-model="isChannelShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '95%', paddingTop: '1rem' }"
    >
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home'
import { mapState } from 'vuex'
import ChannelPanel from './components/ChannelPanel.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  // 频道用户持久化逻辑：1.第一次安装app未登录,ajax2.未登录：本地存储3.已登录：ajax
  // 只要本地存储有数据且未登录，则从本地拿
  // 编辑删除时，未登录放进本地，已登录Ajax
  async created () {
    const channel = getItem(CHANNELS)
    if (!(this.user && this.user.token)) {
      this.channels = channel
    } else {
      try {
        const { data: res } = await getMyChannels()
        // console.log(res)
        this.channels = res.data.channels
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelShow: false
    }
  },
  methods: {
  },
  computed: { ...mapState(['user']) },

  components: { ChannelPanel }
}
</script>

<style scoped lang="less">
.header {
  .van-button {
    width: 555px;
    height: 64px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
}
// 导航区域
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
}
.menu {
  position: fixed;
  right: 0;
  min-width: 66px;
  height: 82px;
  line-height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  .toutiao {
    font-size: 33px;
  }
}
.menu2 {
  min-width: 66px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 750px;
  position: fixed;
  z-index: 1;
  top: 92px;
}
/deep/ .van-pull-refresh {
  overflow: auto;
  height: calc(100vh - 274px);
}
</style>
