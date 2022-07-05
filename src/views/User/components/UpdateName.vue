<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      :safe-area-inset-top="true"
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-right="onClickRight()"
      @click-left="$emit('close')"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <div style="padding: 10px">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user.js'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  created () {
    this.localName = this.value
  },
  data () {
    return {
      localName: ''
    }
  },
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.localName.trim() === '') return this.$toast('请输入昵称')
        await updateUser({
          name: this.localName
        })
        // console.log(res)
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
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
/deep/.van-nav-bar__text {
  color: #fff !important;
}
.van-popup {
  background: #f5f7f9;
}
</style>
