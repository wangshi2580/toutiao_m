<template>
    <van-icon
    :color=" value === 1 ? '#e5645f':'#777'"
    :name=" value === 1 ? 'good-job':'good-job-o'"
    @click="onLike"
    />
</template>

<script>
import { getLike,delLike } from '@/api/like';
export default {
    props:{
        value:{
            type:Number,
            required:true
        },
        art_id:{
            type:[Number,String,Object],
            required:true
        }
    },
    methods:{
        async onLike(){
            console.log(1);
            try {
                //点赞状态下，取消点赞
                let status =-1
                if(this.value===1){
                    await delLike(this.art_id)
                }else{
                //未点赞状态下，点赞
                await getLike(this.art_id)
                status=1
                }
                this.$emit('input',status)
                this.$toast.success(status===1?'点赞成功':'取消点赞')
                
            } catch (err) {
                this.$toast('请求失败')
            }    
        }
    }
}
</script>

<style>

</style>