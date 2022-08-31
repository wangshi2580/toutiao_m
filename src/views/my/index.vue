<template>
  <div class="my-container">
       <div class="login" v-if="user">
        <div class="header-top">
            <div class="header-top-left">
              <van-image :src="userInfo.photo" round class="header-img" fit="cover"/>
                <span class="text">{{userInfo.name}}</span>
            </div>
            <div class="header-top-right">
                <van-button 
                class="btn" 
                round
                to="/user-edit"
                >编辑资料</van-button>
            </div>
        </div>
        <div class="header-bottom">
            <div class="data-item">
                <span>{{userInfo.art_count}}</span>
                <span>头条</span>
            </div>
            <div class="data-item" @click="$router.push('/user-fans')">
                <span>{{userInfo.fans_count}}</span>
                <span>粉丝</span>
            </div>
            <div class="data-item" @click="$router.push('/user-follow')">
                <span>{{userInfo.follow_count}}</span>
                <span>关注</span>
            </div>
            <div class="data-item">
                <span>{{userInfo.like_count}}</span>
                <span>获赞</span>
            </div>
        </div>
    </div>
    <div  class="header not-login" v-else>
        <div class="login-btn" @click="$router.push('/login')">
            <img src="@/assets/mobile.png" alt="" class="mobile-img">
            <span class="text">登录 / 注册</span>
        </div>
    </div>

        <van-grid :column-num="2" class="grid-nav"  clickable  >
            <van-grid-item class="grid-item" to="user-collect" >
                <i class="iconfont icon-shoucang" slot="icon" ></i>
                <span slot="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item"  to="user-history" >
                <i class="iconfont icon-lishi" slot="icon"></i>
                <span slot="text">历史</span>
            </van-grid-item>
        </van-grid>

        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="退出登录" is-link  class="logout-cell" v-if="user" @click="logout"/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser} from '@/api/login'
export default {
    data() {
        return {
            userInfo:{}
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
       
        logout(){
           this.$dialog.confirm({
            title: '确认要退出吗',
            })
            .then(() => {
                // on confirm
                this.$store.commit('setUser',null)
            })
            .catch(() => {
                // on cancel
            });
        },
        async loadUserInfo(){
            try {
                const data = await getUser()
                this.userInfo = data.data.data
                console.log(data.data.data);
            } catch (err) {
                this.$toast('获取数据失败')
            }
        }
    },
    created(){
       if(this.user) {
        this.loadUserInfo()
       }
    }
}
</script>

<style scoped lang="less"> 
    .not-login , .header{      
            display: flex;
            justify-content: center;
            align-items: center;
            height: 134px;
            background: url(~@/assets/banner.png);
            background-size: cover;
        .login-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .mobile-img {
                width: 60px;
                margin-bottom: 10px;
            }
            .text {
                font-size: 14px;
                color: #fff;
            }
        }
    }
.login {
        height: 134px;
        background: url(~@/assets/banner.png);
        .header-top{
            height: 90px;
            display: flex;
            justify-content: space-between;
            padding: 30px;
            box-sizing: border-box;
            .header-top-left {
                display: flex;
                justify-content: center;
                align-items: center;
                .header-img {
                    width: 60px;
                    height: 60px;
                    margin-right: 20px;
                    border: 1px solid #fff;
                }
                .text {
                    font-size: 16px;
                    color:#fff
                }
            }
            .header-top-right {
                display: flex;
                justify-content: center;
                align-items: center;
                .btn {
                    height: 20px;
                    font-size: 14px;
                }
            }
        }
        .header-bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 44px;
            .data-item {
                display: flex;
                flex-direction: column;
                flex: 1;
                align-items: center;
                color: #fff;
                font-size: 16px;
            }
        }
    }
.grid-nav {
    height: 60px;
    .grid-item {
        font-size: 16px;
        height: 60px;
        i.icon-shoucang {
            color:#eb5253
        }
        i.icon-lishi {
            color: #ff9d1d;
        }
    }
}
.logout-cell {
    text-align: center;
    color: #eb5253;
    margin-top: 5px;

}
</style>