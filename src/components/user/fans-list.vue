<template>
  <div class="fans-list">
    <van-cell :title="item.name" :label="`粉丝数${item.fans_count}`" v-for="item,index in fans" :key="index">
        <van-image
          :src="item.photo"
          slot="icon"
          round
          class="img"
        />
          <fansBtn  :isFollow="item.mutual_follow" :aut_id="item.id" @update_follow_btn="item.mutual_follow=$event" >
          </fansBtn>
          
    </van-cell>
   
  </div>
</template>

<script>
import fansBtn from '@/components/artical/fans-btn.vue'
export default {
  props:{
    fans:{
      type:Array,
      required:true
    },
  
  },
  data() {
    return {
       loading:false,
    }
  },
  components:{
    fansBtn
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
  .fans-list {
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
     .follow-btn {
        width: 70px;
        height: 25px;
    }
    .follow-btn2 {
        width: 70px;
        height: 25px;
        background-color: #eee;
        border: none;
        color: #000;
    }

</style>