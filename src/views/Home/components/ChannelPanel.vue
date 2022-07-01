<template>
  <div class="container">
    <!-- 我的频道 -->
    <div class="title my-channel">
      <h3>我的频道</h3>
      <van-button size="mini" plain type="danger" round @click="flag = !flag">{{
        flag ? "完成" : "编辑"
      }}</van-button>
    </div>
    <van-row>
      <van-col
        span="6"
        v-for="(item, index) in channels"
        :key="item.id"
        @click="onClick(index)"
      >
        <div class="inner" :style="{ color: active === index ? 'red' : '' }">
          {{ item.name }}
          <van-icon
            name="close"
            v-if="flag && index !== 0"
            @click="delChannel(item.id)"
          />
        </div>
      </van-col>
    </van-row>
    <!-- 推荐频道 -->
    <div class="title">
      <h3>推荐频道</h3>
    </div>
    <van-row>
      <van-col
        span="6"
        v-for="item in artList"
        :key="item.id"
        @click="addChannel(item.id)"
      >
        <div class="inner van-ellipsis">
          <van-icon name="add" />
          {{ item.name }}
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getAllArt } from '@/api/home'
import { mapState } from 'vuex'
import { setChannels } from '@/api/user'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArt()
  },
  data () {
    return {
      artList: [],
      flag: false
    }
  },
  methods: {
    async getArt () {
      try {
        const { data: res } = await getAllArt()
        // console.log(res)
        this.artList = res.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      } catch (error) {
        console.log(error)
      }
    },
    addChannel (id) {
      const i = this.artList.findIndex(item => item.id === id)
      // eslint-disable-next-line vue/no-mutating-props
      this.channels.push(this.artList[i])
      this.artList.splice(i, 1)
    },
    delChannel (id) {
      const i = this.channels.findIndex(item => item.id === id)
      this.artList.push(this.channels[i])
      // eslint-disable-next-line vue/no-mutating-props
      this.channels.splice(i, 1)
      if (i < this.active) {
        this.$emit('del-event', this.active - 1)
      }
    },
    onClick (index) {
      if (!this.flag) {
        this.$emit('change-active', index)
      }
    }
  },
  computed: { ...mapState(['user']) },

  // 频道用户持久化逻辑：1.第一次安装app未登录,ajax2.未登录：本地存储3.已登录：ajax
  // 只要本地存储有数据且未登录，则从本地拿
  // 编辑删除时，未登录放进本地，已登录Ajax
  watch: {
    channels: {
      async handler (newVal) {
        // console.log(newVal)
        if (this.user && this.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          // console.log(arr)
          try {
            // const res =
            await setChannels(arr)
            // console.log(res.data)
          } catch (error) {
            console.log(error)
          }
        } else { // 未登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  padding: 0 16px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  h3 {
    width: 150px;
    height: 32px;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 2px;
    color: #333333;
  }
  .van-button {
    width: 103px;
    height: 48px;
    border-radius: 20px;
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  color: #222;
  text-align: center;
  line-height: 86px;
  margin: 14px;
  position: relative;
  .van-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
