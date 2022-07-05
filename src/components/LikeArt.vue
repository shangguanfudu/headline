<template>
  <van-icon
    :color="attitude === 1 ? 'red' : ' #777'"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="onClick"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  props: {
    attitude: {
      type: Number,
      required: true
    }
    // target: {
    //   type: [String, Number],
    //   required: true
    // }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    async onClick () {
      if (this.attitude === 1) { // 取消
        try {
          await delLike(this.$route.params.articleId)
          // console.log(res)
          this.$emit('update:attitude', -1)
          this.$toast.success('取消点赞')
        } catch (error) {
          console.log(error)
        }
      } else { // 收藏
        try {
          await addLike(this.$route.params.articleId)
          // console.log(res)
          this.$emit('update:attitude', 1)
          this.$toast.success('点赞成功')
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
