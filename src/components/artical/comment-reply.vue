<template>
  <div class="nav">
    <van-nav-bar
    class="nav-bar"
    :title="`${comment.reply_count}`>0 ? `${comment.reply_count}条回复`:'0条回复'"
    >
        <van-icon name="cross" slot="left" class="icon" @click="$emit('close')"/>
    </van-nav-bar>
    <commentItem :comment="comment"></commentItem>
      <van-cell title="全部回复" />
      <Comments :list="list" :source="comment.com_id" type="c"></Comments>
    <div class="bottom">
        <van-button class="comment" round @click="isPostShow=true">评论</van-button>
    </div>
    <van-popup v-model="isPostShow" position="bottom"  >
            <commentPost :target="comment.com_id" @onSuccess="Success"></commentPost>
    </van-popup>
  </div>
</template>

<script>
import commentItem from '@/components/artical/comment_item.vue'
import Comments from '@/components/artical/comments.vue'
import commentPost from './comment-post.vue';
export default {
    props:{
        comment:{
            type:Object,
            required:true
        }
    },
    components:{
        commentItem,
        Comments,
        commentPost
    },
    data() {
        return {
            isPostShow:false,
            list:[]
        }
    },
    methods:{
        Success(data){
            // 更新回复的数量+1
            this.comment.reply_count++
            // 关闭弹出层
            this.isPostShow=false
            // 更新最新发布的数据
            this.list.unshift(data.new_obj)
        }
    }

}
</script>

<style scoped lang="less">
 .nav {
       .nav-bar {
         /deep/   .van-nav-bar__content{
                background-color: #fff;
                 .van-nav-bar__title{
                    color:#000;
                 }
                 .icon {
                    color:#1989fa ;
                 }
            } 
       }
    }
.bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    border: 1px solid #e3e3e3;
    .comment{
        width: 65%;
        background-color: #eee;
        height: 30px;
       }
}
   

</style>