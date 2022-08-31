<template>
  <div class="edit">
      <van-cell :border="false">
        <div slot="title" class="title">我的频道</div>
        <van-button type="danger" size="mini" plain round class="edit-btn" @click="isShow=!isShow" ref="edit">{{isShow?'完成':'编辑'}}</van-button>
      </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="item,index in my_list" :key="index"  class="my-grid" @click="onMyChannel(item,index)">
          <van-icon slot="icon" name="close" v-show="isShow && !fixedPd.includes(item.id)"></van-icon>
          <span slot="text" class="text" :class="{active :index===active}" >{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
      <van-cell :border="false">
        <div slot="title" class="title">推荐频道</div>
      </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="item,index in recommendChannels" :key="index" icon="plus" class="icon-item" :text="item.name"  @click="add(item)"/>
    </van-grid>
  </div>
</template>

<script>
import {getAllPd,getUserPd,delUserPd} from '@/api/edit.js'
import { mapState } from 'vuex'
import { setItem } from '@/units/storage'
export default {
    data() {
      return {
        AllPd:[],
        isShow:false,
        fixedPd:[0]
      }
    },
    props:{
      my_list:{
        type:Array,
        required:true
      },
      active:{
        required:true,
        type:Number
      }
    },
  methods:{
    async loadGetAllPd(){
      try {
      const data =await getAllPd()
        this.AllPd = data.data.data.channels
      } catch (err) {
        this.$toast('获取失败')
      }
    },
  async add(value){
      this.my_list.push(value)

          if(this.user){
            //在登录状态下 
            try {
              await getUserPd({
              id:value.id,
              seq:this.my_list.length
            })
            } catch (err) {
              console.log(this.$toast('获取失败'));
            }
          }else {
            //在非登录状态下
            setItem('TouTiao_Pd',this.my_list)
          }

    },
    onMyChannel(item,index){
      // 在编辑状态下
      if(this.isShow){
        if(this.fixedPd.includes(item.id)){
          return
        }
        if(index<this.active){
          this.$emit('update_active',this.active-1,true)

        }
          this.my_list.splice(index,1)
          // 持久化处理
          this.delPd(item)
          
      }else{
      //在非编辑状态下
          this.$emit('update_active',index,false)
      }
    },
   async delPd(item){
    try {
    if (this.user) {
      // 已登录，将数据存储到线上
      await delUserPd(item.id)
    } else {
      // 未登录，将数据存储到本地
      setItem('TouTiao_Pd', this.my_list)
    }
  } catch (err) {
    console.log(err)
    this.$toast('删除频道失败，请稍后重试')
  }
   }
  },
  created(){
    this.loadGetAllPd()
  },
  computed:{
    ...mapState(['user']),
    recommendChannels(){
      const channels = []
      this.AllPd.forEach(channel=>{
        const re = this.my_list.find(item=>{
          return item.id === channel.id
        })
        if(!re){
          channels.push(channel)
        }
      })
      return channels
    }
  }
  }
</script>

<style scoped lang="less">
 .edit {
    padding: 45px 0;
   /deep/ .my-grid {
    .van-grid-item__icon-wrapper{
      position: unset;
    }
       .van-grid-item__content {
        .active {
          color: red;
        }
        .text {
            width: 80px;
            height: 50px;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
         .van-grid-item__text{
              margin-top: 0;

        }
          .van-icon {
            position: absolute;
            top: -5px;
            right: -10px;
          }
       }
    }
    .title {
      font-size: 17px;
    }
    .edit-btn {
      width: 55px;
    }
   /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      flex-direction: row;
      width: 80px;
      height: 50px;
      white-space: nowrap;

      .van-grid-item__text {
        font-size: 14px;
        margin-top: 0;
        color: #222;
      }
      .van-icon {
        font-size: 16px;
        margin-right: 3px;
      }
    }

  }
</style>