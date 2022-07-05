<template>
  <van-icon
    :color="is_collected ?'red':'#777'"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
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
      if (this.is_collected) { // 取消
        try {
          await delCollect(this.$route.params.articleId)
          // console.log(res)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      } else { // 收藏
        try {
          await addCollect(this.$route.params.articleId)
          // console.log(res)
          this.$emit('update:is_collected', !this.is_collected)
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
