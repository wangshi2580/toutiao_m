<template>
  <div id="follow">
    <van-tabs v-model="active" >
        <van-icon name="arrow-left" slot="nav-left" class="left" @click="$router.back()"/>
        <van-tab title="关注">
            <followList :follows="follows"></followList>
        </van-tab>
        <van-tab title="粉丝">
            <fansList :fans="fans"></fansList>
        </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import followList from '@/components/user/follow-list.vue'
import fansList from '@/components/user/fans-list.vue'
import {getFollows,getFans} from '@/api/user'
export default {
  components:{
    followList,
    fansList
  },
  data() {
    return {
      active:0,
      page:1,
      per_page:10,
      follows:[],
      fans:[]
    }
  },
  created(){
    this.loadFollows()
    this.loadFans()
  },
  methods:{
   async loadFollows(){
    try {
        const {data} =await getFollows({
          page:this.page,
          per_page:this.per_page
        })
        // console.log(data);
        this.follows=data.data.results
    } catch (error) {
      this.$toast('请求失败')
    }

    },
    async loadFans(){
      try {
        const {data} =await getFans({
          page:this.page,
          per_page:this.per_page
        })
        // console.log(data);
        this.fans=data.data.results
    } catch (error) {
      this.$toast('请求失败')
    }
    }
  }
}
</script>

<style scoped lang="less">
    #follow {
     /deep/ .van-tabs{
             .van-tabs__wrap{
                  .van-tabs__nav {
                background-color: #3296fa ;
                .van-icon,.van-icon-arrow-left{
                    display: flex;
                    font-size: 20px;
                    color: #fff;
                    justify-content: center;
                    align-items: center;
                    padding-left: 10px;
                }
             }
             .van-tab {
                .van-tab__text{
                        font-size: 13px ;
                        color: #fff;
                }
             }
        }
        }
    }

</style>