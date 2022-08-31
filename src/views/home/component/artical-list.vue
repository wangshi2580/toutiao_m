<template>
    <div class="artical-list">
        <van-pull-refresh  v-model="isLoading" success-text="刷新成功" @refresh="onRefresh" success-duration="1500" >
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="onLoad"
                >
                    <artical v-for="item in list" :key="item.art_id" :title="item.title" :art_item="item"></artical>
            </van-list>
        </van-pull-refresh>
       
    </div>
</template>

<script>
import {getArtcial} from '@/api/login'
import artical from '@/components/artical/artical.vue'
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            timestamp:null,
            error: false,
            isLoading:false
        }
    },
    props:{
       item:{
        type:Object,
        required:true
       }

    },
    components:{
        artical
    },
   
     methods:{
        async  onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        try {
            const res =await getArtcial({
                channel_id:this.item.id,
                timestamp:this.timestamp || Date.now()
            })
            // console.log(res.data.data.results);
            this.list.push(...res.data.data.results)
            this.loading = false
            if(res.data.data.results.length){
                this.timestamp = res.data.data.pre_timestamp
            }else {
                this.finished =true
            }
        } catch (err) {
            this.error = true;
            this.loading=false
        }
    },
    async  onRefresh() {
      // 重新加载数据
       try {
            const res =await getArtcial({
                channel_id:this.item.id,
                timestamp:Date.now()
            })
          
            this.list.unshift(...res.data.data.results)
            this.isLoading=false
        } catch (err) {
            console.log('请求失败');
        }
      // 将 loading 设置为 true，表示处于加载状态
      
    },
    }

}
</script>

<style scoped lang="less">
   .artical-list {
    height: 78vh;
    overflow-y: auto;
   }
 
</style>