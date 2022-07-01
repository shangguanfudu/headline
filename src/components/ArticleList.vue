<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(obj, index) in articleList"
          :key="index"
          :article="obj"
        ></ArticleItem>
        <!-- <van-cell
          v-for="(obj, index) in articleList"
          :key="index"
          :title="obj.title"
          :label="obj.pubdate"
        >
          <template #default>
            <van-image width="116" height="73" alt="" />
          </template>
        </van-cell> -->
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticles } from '@/api/home'
import ArticleItem from '@/components/ArticleItem.vue'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  created () {
    this.getArticleList()
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const { data: res } = await getArticles({ channel_id: this.id, timestamp: this.timestamp })
        // console.log(res)
        this.timestamp = res.data.pre_timestamp
        // 数据全部加载完成
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.results)
        // 数据更新完毕后，把loading设置成false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      // 清空列表数据
      this.timestamp = Date.now()
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  computed: {},
  components: { ArticleItem },
  mounted () {
    ele = this.$refs.pullRefresh.$el
    // 记住阅读位置($el对应组件根标签)
    ele.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  }
}
</script>

<style scoped lang="less">
.van-cell-group {
  padding-top: 174px;
}
</style>
