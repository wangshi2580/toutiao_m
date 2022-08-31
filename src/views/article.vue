<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar" 
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->


      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleData.title" >
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleData.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleData.aut_photo"
          />
          <div slot="title" class="user-name">{{articleData.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleData.pubdate | relativeTime}}</div>
          <!-- 关注按钮组件 -->
          <Follow_user_btn class="follow-btn" :isFollow="articleData.is_followed" :aut_id="articleData.aut_id" @update_follow_btn="articleData.is_followed=$event"></Follow_user_btn>
          <!-- <van-button
            v-if="articleData.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="loadFollow"
          >已关注</van-button>
          <van-button
          v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="loadFollow"
          >关注</van-button> -->
          
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="articleData.content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论组件 -->
        <Comments :source="articleId" :list="commentList" @replyClick="onReplyClick"></Comments>
        <!-- 评论按钮组件 -->
        <van-popup v-model="isshow" position="bottom" >
            <CommentPost :target="articleId" @onSuccess="Success"></CommentPost>
        </van-popup>

           <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isshow=true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="articleData.comm_count"
        color="#777"
      />

      <!-- 收藏组件-->
      <Collect v-model="articleData.is_collected" :art_id="articleData.art_id"></Collect>
     
      <Like v-model="articleData.attitude" :art_id="articleData.art_id"></Like>
 
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadGetArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!--评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '100%' }" >
      <CommentReply v-if="isReplyShow" :comment="currentComment" @close="isReplyShow=false"></CommentReply>
    </van-popup>
 
  </div>
</template>

<script>
import {getArticle} from '@/api/article'
import Follow_user_btn from '@/components/artical/follow_user_btn.vue'
import Collect from '@/components/artical/collect.vue'
import Like from '@/components/artical/Like.vue'
import Comments from '@/components/artical/comments.vue'
import CommentPost from '@/components/artical/comment-post.vue'
import CommentReply from '@/components/artical/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  components: {
    Follow_user_btn,
    Collect,
    Like,
    Comments,
    CommentPost,
    CommentReply
},
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  provide:function(){
    return {
      articleId:this.articleId
    }
  },
  data () {
    return {
        articleData:{},
        loading:true,
        errStatus:0,
        loadFollow:false,
        isshow:false,
        commentList:[],
        isReplyShow:false,
        currentComment:{}
    }
  },
  computed: {
   
  },
  watch: {},
  created () {
    this.loadGetArticle()
  },
  mounted () {},
  methods: {

    onClickLeft(){
        this.$router.back()
    },
   async loadGetArticle(){
    this.loading=true
      try{
        const data = await getArticle(this.articleId)
        // if(Math.random()>0.5){
        //   JSON.parse('askahhsjahsjshaj')
        // }
        // console.log(data);
        this.articleData = data.data.data
        console.log(this.articleData);
      }catch(err){
        // this.$toast('请求失败')
        console.log(err);
        if(err.response && err.response.status === 404){
          this.errStatus=404
        }
      }
      this.loading=false
   },
  Success(data){
    // 关闭弹出层
    this.isshow=false
    // 将发布的内容添加到列表最前
    this.commentList.unshift(data.new_obj)
  },
  onReplyClick(comment){
    this.isReplyShow=true
    this.currentComment=comment
    console.log(comment);
  }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 50px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 25px;
      padding: 20px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 18px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 16px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 90px;
        height: 40px;
      }
    }

    .article-content {
        font-size: 16px;
      padding: 5px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 60px;
      color: #b4b4b4;
    }
    .text {
      font-size: 18px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 120px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #c3c3c3;
      font-size: 16px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 120px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 18px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 25px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>