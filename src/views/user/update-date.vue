<template>
  <div>
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title=""
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import {editUserInfo} from '@/api/user'
export default {
    data() {
        return {
            minDate: new Date(1990, 0, 1),
            maxDate: new Date(),
            currentDate:new Date(this.value),
        }
    },
    props:{
        value:{
            type:[String,Number],
            required:true
        }
    },
    methods:{
      async  onConfirm(value){
          const localDate =  dayjs(value).format('YYYY-MM-DD');
           this.$toast.loading({
            message:'更新中',
            forbidClick:true,
            duration:0
        })
       try{
       await editUserInfo({
            birthday:localDate
        })
        // 更新视图
        this.$emit('input',localDate)
        // 关闭弹层
        this.$emit('close')
        //成功提示
        this.$toast.success('更新成功')
       }catch(err){
        this.$toast('更新失败')
       }
    },
    }
}
</script>

<style>

</style>