<template>
  <div class="search-result">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
        <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchRes } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  components: { ArticleItem },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {},
  watch: {},
  created () {
    this.load()
  },
  mounted () { },
  methods: {
    async load () {
      try {
        const { data: res } = await getSearchRes({
          page: this.page, // 页码
          per_page: this.perPage, // 每页数量
          q: this.searchText// 搜索关键字
        })
        // console.log(res)
        if (res.data.results.length === 0) {
          this.finished = true// 数据加载完成后
        }
        this.list.push(...res.data.results)// 新旧数据合并而不是覆盖
        //  设置加载状态结束
        this.loading = false
        this.refreshing = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () { // 页面到底后自动把loading改true触发
      this.page++// 当前页加一请求下一页数据
      this.load()
    },
    onRefresh () {
      // 清空列表数据
      this.list = []
      this.page = 1
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.load()
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
