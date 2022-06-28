<template>
  <div class="container">
    <router-view class="main" />

    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home">
        首页
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/video"
        >视频
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/ask"
        >咨询
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/my"
        >我的
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped lang="less">

.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
.main{
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
