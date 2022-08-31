<template>
  <div>
    <van-cell icon="search" v-for="item,index in thinks" :key="index" @click="$emit('search',item)" >
    
    <div slot="title" v-html="highlight(item)" ></div>
    </van-cell>
  </div>
</template>

<script>
import {getSearchThink} from '@/api/search'
import {debounce} from 'lodash'
export default {
    data() {
        return {
            thinks:[]
        }
    },
    props:{
        searchText:{
            type:String,
            required:true
        }
    },
    watch:{
        searchText:{
            // handler(value){
            //     this.loadThink(value)
            // },
            handler:debounce(function(value){
                this.loadThink(value)
            },200), 
            immediate:true
            

        }
    },
    methods:{
        async loadThink(q){
            try {
              const data =await getSearchThink(q)
              this.thinks=data.data.data.options
            } catch (error) {
                this.$toast('请求失败')
            }
        },
        highlight(value){
            const highStr = `<span class="active">${this.searchText}</span>`
            const reg = new RegExp(this.searchText,'gi')
            return value.replace(reg,highStr)
            
        }
    }
}
</script>

<style scoped lang="less">
/deep/ span.active {
    color: #3296fa;
}
</style>