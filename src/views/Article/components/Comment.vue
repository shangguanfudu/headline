<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id">
        <CommentItem :comment="item"></CommentItem>
        <!-- <van-icon
          slot="right-icon"
          color="red"
          :name="item.is_liking ? 'like' : 'like-o'"
          @click="onCommentLike(item)"
        /> -->
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  name: 'ArticleComment',
  components: { CommentItem },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    },
    newComment: { type: Object }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null // 请求下一页数据的页码
    }
  },

  methods: {
    async onLoad () {
      // 异步更新数据
      const { data: res } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // console.log(res)
      this.list.push(...res.data.results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (res.data.results.length) {
        this.offset = res.data.last_id
      } else {
        this.finished = true
      }
    }
  },
  watch: {
    newComment: {
      handler (newVal) {
        this.list.push(newVal)
      }
    }
  }
}

</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
