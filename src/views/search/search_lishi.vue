<template>
  <div>
     <van-cell title="历史记录"  >
        <div v-if="isDeleteShow">
            <span slot="default" @click="$emit('delAll')">全部删除</span>
            &nbsp;
            <span slot="default" @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon name="delete-o" v-else @click="isDeleteShow=true" />
    </van-cell>
    <van-cell :title="item" v-for="item,index in searchHistory" :key="index" @click="del(item,index)">
        <van-icon name="close" slot="right-icon" v-show="isDeleteShow" />
    </van-cell>
  
  </div>

</template>

<script>

export default {
    props:{
        searchHistory:{
            type:Array,
            required:true
        }
    },
    data() {
        return {
            isDeleteShow:false
        }
    },
    methods:{
        del(item,index){
            if(this.isDeleteShow){
                //删除状态下
                this.searchHistory.splice(index,1)
            }else{
                //非删除状态下
                this.$emit('search',item)
            }
        }
                
    },
}
</script>

<style scoped lang="less">

</style>