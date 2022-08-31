<template>
  <div>
    <form action="/" class="search_container">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            class="search"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow=false"
        />
    </form>
    <Search_result v-if="isResultShow" :searchText="searchText" ></Search_result>
    <Search_think v-else-if="searchText" :searchText="searchText" @search="onSearch"></Search_think>
    <Search_lishi v-else :searchHistory="searchHistory" @delAll="searchHistory=[]" @search="onSearch"></Search_lishi>
   </div>
</template>

<script>
import Search_lishi from '@/views/search/search_lishi.vue'
import Search_think from '@/views/search/search_think.vue'
import Search_result from '@/views/search/search_result.vue'
import { setItem,getItem } from '@/units/storage';

export default {
   components:{
    Search_lishi,
    Search_think,
    Search_result,
}, 
    data() {
        return {
              searchText: '',
              isResultShow:false,
              searchHistory:getItem('toutiao_his')||[]
        }
    },
  methods: {
    onSearch(val) {
    //  this.$toast(val);
    this.searchText = val
     this.isResultShow=true
     const index = this.searchHistory.indexOf(val)
     if(index !== -1){
      this.searchHistory.splice(index,1)
     }
     this.searchHistory.unshift(val)

    },
    onCancel() {
      this.$router.back()
    },
  },
  watch:{
    searchHistory(value){
      // console.log(value);
      setItem('toutiao_his',value)
    }
  }
};

</script>

<style scoped lang="less">
.search_container {
    padding-top: 50px;
}
.search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
    background-color: #6db4fb;
    .van-search__action {
        color: #fff;
    }
}
</style>