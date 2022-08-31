<template>
  <div>
    <router-view></router-view>
    <van-tabbar  class="layout-container" route>
        <van-tabbar-item icon="home-o" to="/">
            <i class="iconfont icon-shouye" slot="icon"></i>
            <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item icon="search" to="/wd">
            <i class="iconfont icon-wenda" slot="icon"></i>
            <span>问答</span>
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/video">
            <i class="iconfont icon-shipin" slot="icon"></i>
            <span>视频</span>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/my">
             <i class="iconfont icon-wode" slot="icon"></i>
            <span>{{$store.state.user?'我的':'未登录'}}</span>
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    
}

</script>

<style scoped lang="less">

</style>