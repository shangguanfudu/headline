<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow @click-left="$router.go('-1')" title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <template v-else>
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="!!articleInfo.art_id">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ articleInfo.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="articleInfo.aut_photo"
            />
            <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
            <div slot="label" class="publish-date">
              {{ articleInfo.pubdate | dateformat }}
            </div>
            <FollowUser
              v-model="articleInfo.is_followed"
              :target="articleInfo.aut_id"
            ></FollowUser>
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content markdown-body"
            v-html="articleInfo.content"
          ></div>
          <van-divider>正文结束</van-divider>
          <!-- 文章评论 -->
          <Comment
            :newComment="newComment"
            :articleId="articleId"
            @onload-success="totalCount = $event"
          ></Comment>
          <!-- 发布文章评论 -->
          <van-popup v-model="isPostShow" position="bottom">
            <PublishComment @onpost-success="onPostSuccess"></PublishComment>
          </van-popup>
          <!-- /发布文章评论 -->
          <!-- 评论回复 -->
          <van-popup
            class="replay"
            v-model="isReplyShow"
            position="bottom"
            style="height: 95%"
          >
            <span class="cancel" @click="isReplyShow = false">取消</span>
            <CommentReply></CommentReply>
          </van-popup>
          <!-- /评论回复 -->
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="is404Error">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="!isLoading && !!articleInfo.art_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = !isPostShow"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="articleInfo.comm_count" color="#777" />
      <CollectArt :is_collected.sync="articleInfo.is_collected"></CollectArt>
      <LikeArt :attitude.sync="articleInfo.attitude"></LikeArt>
      <van-icon
        name="share"
        color="#777777"
        @click="showShare = true"
      ></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import 'github-markdown-css'
import { getArticleById } from '@/api/article.js'
import CommentReply from './components/CommentReply.vue'
import Comment from './components/Comment.vue'
import PublishComment from './components/PublishComment.vue'

export default {
  name: 'ArticleIndex',
  components: { CommentReply, Comment, PublishComment },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      articleInfo: {},
      isLoading: true, // 页面刚打开时显示加载中
      is404Error: false,
      showShare: false,
      isPostShow: false,
      isReplyShow: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      newComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArtcileInfo()

    this.$bus.$on('click-reply', (comment) => {
      if (comment) {
        this.isReplyShow = true
      }
    })
  },
  mounted () {
  },
  methods: {
    async loadArtcileInfo () {
      try {
        const { data: res } = await getArticleById(this.articleId)
        // console.log(res)
        this.articleInfo = res.data

        this.isLoading = false
        // 图片预览
        this.$nextTick(() => {
          const imgs = document.querySelectorAll('.article-content img')
          if (imgs.length === 0) return// 代码更安全
          const srcs = []
          imgs.forEach((img, index) => {
            srcs.push(img.src)
            img.onclick = function () {
              ImagePreview({
                images: srcs,
                startPosition: index,
                maxZoom: 3,
                showIndicators: true
              })
            }
          })
        })
      } catch (err) {
        this.$toast('获取失败')
        // 可选链err.response？.status
        if (err.response && err.response.status === 404) {
          this.is404Error = true
        }
      }
    },
    onSelect (option) {
      this.$toast(option.name)
      this.showShare = false
    },
    onPostSuccess (res) {
      // console.log(res)
      this.newComment = res.data.data.new_obj
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.cancel {
  font-size: 14px;
  margin: 32px;
}
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
/deep/ .van-popup--bottom {
  bottom: 1.173rem !important;
}
.replay {
  /deep/&.van-popup--bottom {
    top: 1.173rem !important;
  }
}
</style>
