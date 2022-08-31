<template>
  <div>
      <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
      <van-cell v-for="item,index in list" :key="index" :title="item.title" :to="`/article/${item.art_id}`" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:10
    };
  },
  props:{
    searchText:{
      type:String,
      required:true
    } 
  },  
  methods: {
   async onLoad() {
      //1.请求获取数据
      try {
        const {data} = await getSearchResult({
          page:this.page,
          per_page:this.per_page,
          q:this.searchText
        })
        // console.log(data);
        //2.将数据添加到数据列表中
        const result = data.data.results
        this.list.push(...result)

        //3.将本次loading关闭
        this.loading=false
        //4.判断是否还有数据
        //如果有，则更新获取下一个数据的页码
        //如果没有，则将加载状态设置为结束
        if(result.length){
          this.page++
        }else {
          this.finished=true
        }
      } catch (error) {
        
      }

    },
    aa(){
      console.log(1);
    }
  },

}
</script>

<style>

</style>