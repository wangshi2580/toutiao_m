<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录"  left-arrow   @click-left="onClickLeft"/>
    <van-form @submit="onSubmit" ref="loginForm">
        <van-field 
            center
            v-model="user.mobile"
            left-icon="music-o"
            name="mobile"
            placeholder="请输入手机号"   
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11"
        >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
        </van-field>
        <van-field
            center
            v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            :rules="userFormRules.code"
            type="number"
            maxlength="6"
        >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
             <van-count-down :time="60 * 1000" format="ss s" v-if="isCountShow"  @finish="isCountShow=false"/>
             <van-button size="small" type="default" class="send-sms-btn" round native-type="button" @click="sendMsg" v-else>发送验证码</van-button>
        </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import {login,send} from '@/api/login'
export default {
 name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
        user:{
            code:'',
            mobile:''
        },
        userFormRules:{
          mobile:[
            { required: true, message: '请输入手机号' },
            {pattern:/^1[3|5|7|8]\d{9}$/,message:'输入的手机格式有误'}
            ],
          code:[{ required: true, message: '请输入验证码' },{pattern:/^\d{6}$/,message:'输入的验证码格式有误'}]
        },
        isCountShow:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
     async onSubmit() {
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
         });
        try {
            const res = await login(this.user)
            this.$toast.success('登录成功');
            this.$store.commit('setUser',res.data.data)
            this.$router.back()
        } catch (err) {
            if(err.response.status===400){
                console.log('登录失败',err);
                this.$toast.fail('登录失败');
            }
        }
        
    },
     async sendMsg(){
      try {
     await this.$refs.loginForm.validate('mobile')
     console.log('验证成功');
      } catch (err) {
    return console.log('验证失败'); 
      }

     this.isCountShow=true

      try {
        await send(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.$toast('发送失败')
        this.isCountShow=false
      }
    },
      onClickLeft() {
      this.$router.back()
    },
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 30px;
   
  }
}
 .send-sms-btn {
    width: 122px;
    height: 36px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 15px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 33px;
    .login-btn {
        background-color: #6db4fb;
        border: none;
    }
  }

</style>