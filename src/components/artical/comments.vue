<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error="error"
  error-text="加载失败，请重试"
>
  <commentItem v-for="item,index in list" :key="index" :title="item.content" :comment="item" 
  @reply-click="$emit('replyClick',$event)"
  />
</van-list>
</template>

<script>
import {getComment} from '@/api/comments'
import commentItem from '@/components/artical/comment_item.vue'
export default {
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset:null,
            limit:10,
            error:false
        }
    },
    props:{
        source:{
            type:[Number,String,Object],
            required:true
        },
        list:{
            type:Array,
            default:()=>[]
        },
        type:{
            type:String,
            default:'a'
        }
    },
    methods: {
        async  onLoad() {
      //1.请求获取数据
             try {
       const {data} = await getComment({
        type:this.type,
        source:this.source,
        offset:this.offset,
        limit:this.limit
          })
         const re = data.data.results
        //2.将数据添加到列表中
        this.list.push(...re)
        //3.将loading设置为false
         this.loading = false;
        //4.判断是否还有数据，有就更新下一页的页码，没有就设置finished为true
        if(re.length){
            this.offset=data.data.last_id
        }else {
            this.finished=true
        }
            } catch (err) {
                this.error=true
                this.loading=false
            }
      
     },
    },
    components:{
        commentItem
    }
}
</script>

<style>

</style>