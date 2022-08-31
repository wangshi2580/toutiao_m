<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <div class="topbar">
     <van-button class="search-btn" round @click="$router.push('search')">
       <van-icon name="search" /> 
       <span slot="default" class="text">搜索</span>
     </van-button>
    </div>
    <!-- /导航栏 -->
    <!-- 标签页 -->
    <van-tabs v-model="active" animated swipeable class="biaoqian">
      <van-tab :title="item.name" v-for="item in art_list" :key="item.id">
        <artical :item="item"></artical>
      </van-tab>
      <div slot="nav-right" class="place"></div>
      <div slot="nav-right" class="nav-right" >
          <i class="iconfont icon-gengduo" @click="isShow=true"></i>
      </div>
    
   </van-tabs>
     <van-popup
        v-model="isShow"
        closeable
        position="bottom"
         close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
      <PdEdit :my_list="art_list" :active="active" @update_active="onUpdate"></PdEdit>
      </van-popup> 
  </div>
</template>

<script>
import {getUserPd} from '@/api/login'
import artical from '@/views/home/component/artical-list.vue'
import PdEdit from '@/components/PdEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/units/storage'

export default {
   data() {
    return {
      active: 0,
      art_list:[],
      isShow:false
     
    };
  },
  created(){  
      this.loadPd()
  } ,
  methods:{
   async loadPd() {
     try {
        // const res =await getUserPd()
        // this.art_list = res.data.data.channels
        let AllPd = []
        if(this.user) {
          //已登录 请求获取线上的频道数据
        const res =await getUserPd()
       AllPd = res.data.data.channels
        }else {
          const localPd = getItem('TouTiao_Pd')
          if(localPd){
            AllPd=localPd
          }else {
            const res = await getUserPd()
            AllPd = res.data.data.channels
          }
        }
        this.art_list = AllPd
     } catch (err) {
      console.log('失败');
     }
   },
   onUpdate(index,flag=true){
    this.active=index
    this.isShow=flag
   }
 
  },
  components:{
    artical,
    PdEdit
},
computed:{
  ...mapState(['user'])
}
}
</script>

<style scoped lang="less">
  .home-container{
    padding-top: 95px;
    .topbar {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      background-color: pink;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
      background-color: #6db4fb;
        .search-btn {
          height: 30px;
          width: 80%;
          color: #fff;
          background-color: #6db4fb;
              .van-icon {
                font-size: 15px;
                margin-right: 5px;
                position: relative;
                top: 2px;
              }
              .text {
                font-size: 15px;
              }

    }
  
      .van-search__content {
        background-color: #55a6ff;
      }
      .van-cell {
        color: #fff;
      }

    }
    .biaoqian {
      /deep/  .van-tab {
      border-right: 1px solid #edeff3;
      flex: 1;
      min-width: 100px;

    }
     /deep/ .van-tabs__line {
      width: 15px ;
      height: 3px;
      margin-bottom:3px;
      background-color: #3296fa;
    }
    /deep/ .van-tabs__nav--line {
      padding-top: 0  ;
    }
    .van-tab--active {
      color: #333;
    }
    .nav-right {
      position: fixed ;
      right: 0;
      width: 40px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.962;
      .iconfont {
        font-size: 20px;
      }
    }
    .place {
      // width: 40px;
      // height: 45px;
      // flex-shrink:0
    }
    }
   /deep/ .van-tabs__content {
      padding-bottom: 40px;
    }
    
  /deep/  .van-tabs__wrap {
      position: fixed;
      top: 52px;
      left: 0;
      z-index: 1;
    }
  }
  


</style>