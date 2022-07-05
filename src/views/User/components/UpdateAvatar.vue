<template>
  <div class="update-avatar">
    <img :src="img" ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="onConfirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user.js'
export default {
  props: {
    img: {
      type: [String, Object],
      retuired: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    // console.log(this.cropper)
  },
  methods: {
    onConfirm () {
      // console.log(this.cropper.getData())//服务端裁切：用getData()获取裁切参数传给后端

      // 客户端裁切getCroppedCanvas()
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserAvatar(blob)
      })
    },
    async updateUserAvatar (blob) {
      // console.log(blob)
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        // 创建formData数据
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserAvatar(formData)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-avatar', data.data.photo)
        // console.log(data)
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
  img {
    min-width: 100%;
    display: block;
  }
}
</style>
