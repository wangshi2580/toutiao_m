<template>
  <van-icon
        :name="value ? 'star':'star-o'"
        :color="value ? '#ffa500' : '#777' "
       @click="onCollect"
  /> 
</template>

<script>
import {delCollect,getCollect} from '@/api/collect'
export default {
    props:{
        value:{
            type:Boolean,
            required:true
        },
        art_id:{
            type:[Number,String,Object],
            required:true
        }
    },
    methods:{
        async onCollect(){
      try {
        //收藏状态下
        if(this.value){
          await delCollect(this.art_id)
          
        }else {
        //非收藏状态下
          await getCollect(this.art_id)

        }
        this.$emit('input',!this.value)
        this.$toast.success(!this.value?'收藏成功':'取消收藏')
      } catch (err) {
        this.$toast('请求失败')
        console.log(err);
      }
   }
    }
}
</script>

<style>

</style>