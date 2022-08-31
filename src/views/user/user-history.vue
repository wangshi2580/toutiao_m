<template>
  <div>
    <van-nav-bar
        title="收藏/历史"
        left-arrow
        @click-left="$router.back()"
        />
        <van-tabs v-model="active">
            <van-tab title="我的收藏" >
                <artical v-for="item,index in collects" :key="index" :art_item="item" ></artical>
            </van-tab>
            <van-tab title="我的历史" >
                <artical v-for="item,index in historys" :key="index" :art_item="item" ></artical>
            </van-tab>
        </van-tabs>
  </div>
</template>

<script>
import artical from '@/components/artical/artical.vue';
import {getCollects,getHistorys} from '@/api/user'
export default {
    data() {
        return {
            active:1,
            collects:[],
            historys:[]
        }
    },
    components:{
        artical
    },
    created(){
        this.loadCollects()
        this.loadHistorys()
    },
    methods:{
     async loadCollects(){
        try {
            const {data} = await getCollects()
            // console.log(data);
            this.collects = data.data.results
        } catch (error) {
            this.$toast('获取失败')
        }
     },
     async loadHistorys(){
             try {
            const {data} = await getHistorys()
            // console.log(data);
            this.historys = data.data.results
        } catch (error) {
            this.$toast('获取失败')
        }

     },
    
    }
}
</script>

<style>

</style>