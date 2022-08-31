<template>
   <van-button
    v-if="isFollow"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
    >
    已关注
    </van-button>
    <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >
    关注
    </van-button>
</template>

<script>
import {getFollow , delFollow} from '@/api/user'
export default {
    data() {
        return {
            loading:false
        }
    },
    props:{
        isFollow:{
            type:Boolean,
            required:true
        },
        aut_id:{
            type:[Number,String,Object],
            required:true
        }
    },
    methods:{
          async  onFollow(){
        this.loading=true
        try {
        //关注状态下，点击取消关注
           if(this.isFollow){
              await delFollow(this.aut_id)
           }else {
        //非关注状态下，点击关注
          await getFollow(this.aut_id)
             }
        //用户点击关注按钮  状态发生变换
        // this.articleData.is_followed=!this.articleData.is_followed
        this.$emit('update_follow_btn',!this.isFollow)

        } catch (err) {
          console.log(err);
          if(err.response && err.response.status ===400){
            this.$toast('用户不能关注自己')
          }
        }
        this.loading=false

    },
    }
}
</script>

<style>

</style>