<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{comment.aut_name}}</div>
      <van-button
        class="like-btn"
        :class="{liked:comment.is_liking}"
        :icon="comment.is_liking?'good-job':'good-job-o'"
        @click="onLike"
        :loading="LikeLoading"
      >{{comment.like_count||'赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{comment.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click',comment)"
        >回复 {{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import {getCommentLike,delCommentLike} from '@/api/comments'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment:{
        type:Object,
        required:true
    }
  },
  data () {
    return {
        LikeLoading:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  async onLike(){
    this.LikeLoading=true
        try {
            //在点赞状态下 取消点赞
            if(this.comment.is_liking){
                await delCommentLike(this.comment.com_id)
                this.comment.like_count--
            }else{
            //在未点赞状态下  点赞
            await getCommentLike(this.comment.com_id)
                this.comment.like_count++
            }
            this.comment.is_liking = !this.comment.is_liking
        } catch (error) {
            this.$toast('请求失败，请重试')
        }
            this.LikeLoading=false

    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 32px;
    height: 32px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 18px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 14px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 16px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 18px;
    }
    &.liked {
        color: #e5645f;
    }
  }
}
</style>
