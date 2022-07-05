<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <!-- <van-nav-bar :title="`${currentComment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar> -->
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <van-cell title="当前评论"> </van-cell>
    <CommentItem :comment="currentComment"></CommentItem>
    <!-- /当前评论项 -->

    <!-- 评论的回复列表 -->
    <van-cell title="所有回复"> </van-cell>
    <CommentItem
      v-for="item in list"
      :key="item.com_id"
      :comment="item"
    ></CommentItem>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'CommentReply',
  components: {},
  props: {},
  data () {
    return {
      currentComment: {},
      offset: null,
      list: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.$bus.$on('click-reply', (comment) => {
      // console.log(comment)
      this.currentComment = comment
      this.$nextTick(() => {
        this.getComments()
      })
    })
  },
  mounted () { },
  methods: {
    async getComments () {
      const { data: res } = await getComments({
        type: 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.currentComment.com_id, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // console.log(res)
      // this.list.push(...res.data.results)
      this.list = res.data.results
    }
  }
}
</script>

<style scoped></style>
