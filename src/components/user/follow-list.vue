<template>
  <div class="follow-list">
    <van-cell :title="item.name" :label="`粉丝数${item.fans_count}`" v-for="item,index in follows" :key="index">
        <van-image
          :src="item.photo"
          slot="icon"
          round
          class="img"
        />
       
          <followBtn  :isFollow="item.mutual_follow" :aut_id="item.id" @update_follow_btn="item.mutual_follow=$event" ></followBtn>
       
    </van-cell>
   
  </div>
</template>

<script>
import followBtn from '@/components/artical/follow-btn.vue'

export default {
  props:{
    follows:{
      type:Array,
      required:true
    }
  },
  components:{
    followBtn
  }
}
</script>

<style lang="less" scoped>
  .follow-list {
    .van-cell__title {
      font-size: 12px;
      margin-left: 5px;
      .van-cell__label {
        font-size: 10px;
        margin-top: -5px;
      }
    }
    .img {
      width: 40px;
      height: 40px;
    }
    .btn {
      width: 50px;
      height: 20px;
    }

  }

</style>