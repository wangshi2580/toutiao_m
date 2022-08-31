<template>
  <div id="updateName">
    <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        :default-index="value"
        @change="onChange"
        />
  </div>

</template>

<script>
import { editUserInfo } from '@/api/user';
export default {
    name:'updateGender',
  data() {
    return {
         columns: ['男', '女'],
         localGender:this.value
    }
  },
  props:{
    value:{
        type:Number,
        required:true
    }
  },
  methods:{
  async  onConfirm() {
    this.$toast.loading({
        message:'更新中',
        forbidClick:true,
        duration:0
    })
       try{
       await editUserInfo({
            gender:this.localGender
        })
        // 更新视图
        this.$emit('input',this.localGender)
        // 关闭弹层
        this.$emit('close')
        //成功提示
        this.$toast.success('更新成功')
       }catch(err){
        this.$toast('更新失败')
       }
    },
     onChange(picker, value, index) {
    //  console.log(value,index);
    this.localGender=index
    }
    
   
  }
}
</script>

<style lang="less" scoped>


#updateName {
   .nav-bar,.van-nav-bar{
    /deep/ .van-nav-bar__content {
       background-color: #fff;
            .van-nav-bar__title {
                    color: #000 ;
                }
      }
    }
    .edit {
      padding: 10px;
      
    }
    
  }
    

</style>