<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" @click-left="$router.go('-1')">
      <template #left>
        <van-icon name="cross"></van-icon>
      </template>
      <!-- <van-icon name="cross" slot="left" /> -->
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-cell-group>
        <!-- 表单验证：
        1、给 van-field 组件配置 rules 验证规则
          参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit -->
        <van-field
          name="mobile"
          type="number"
          placeholder="请输入手机号"
          v-model="user.mobile"
          :rules="userFormRules.mobile"
          clearable
          required
          maxlength="11"
        >
          <MyIcon iconName="shouji" slot="left-icon"></MyIcon>
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          type="number"
          name="code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          v-model.trim="user.code"
          required
          maxlength="6"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-count-down
              :time="time"
              format="剩余 ss 秒"
              v-if="isCountShow"
              @finish="isCountShow = false"
            />
            <van-button
              v-else
              @click="sendCode()"
              class="send-sms-btn"
              round
              size="small"
              native-type="button"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, getCode } from '@/api/user.js'
import MyIcon from '@/components/MyIcon.vue'

export default {
  name: 'LoginIndex',
  components: { MyIcon },
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机格式' },
          { required: true, message: '请输入手机号' }
        ],
        code: [
          { pattern: /^\d{6}$/, message: '验证码长度为6位' },
          { required: true, message: '请输入验证码' }
        ]
      },
      time: 5 * 1000,
      isCountShow: false
    }
  },
  methods: {
    // 验证码
    async sendCode () {
      try {
        // 发送前先确认手机号码
        const result = this.$refs.form.validate('mobile')
        console.log(result)
        console.log('校验通过')
        this.isCountShow = true
        await getCode(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('发送失败，请重试')
      }
    },
    // 登录
    async onSubmit (values) {
      // console.log('submit', values)
      // this.$toast.loading({
      //   duration: 0, // 持续时间，0表示持续展示不停止
      //   forbidClick: true, // 是否禁止背景点击
      //   message: '登录中...' // 提示消息
      // })
      try {
        const { data: res } = await login(values)
        // console.log(res)
        this.$store.commit('SETUSER', res.data)
        this.$toast.success('登录成功')
        this.$router.push({ name: 'my' })
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    position: fixed;
    right: 10px;
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    .van-button__text {
      zoom: 0.9;
    }
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .van-count-down {
    position: fixed;
    right: 18px;
  }
}
</style>
