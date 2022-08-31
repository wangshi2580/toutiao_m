<template>
  <div id="updateName">
    <van-nav-bar
        class="nav-bar"
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="editInfo"
        />
        <div class="edit">
            <van-field
          class="editText"
          v-model.trim="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
          />
        </div>
    
  </div>

</template>

<script>
import { editUserInfo } from '@/api/user';
export default {
    name:'updateName',
  data() {
    return {
      message:this.value
    }
  },
  props:{
    value:{
      type:String
    }
  },
  methods:{
   async editInfo(){
    this.$toast.loading({
      message:'保存中',
      forbidClick:true,
      duration:0
    })
      try {
        const localName = this.message
        if(!localName.length){
          this.$toast('昵称不能为空')
          return
        }
      const {data} =  await editUserInfo({
            name:localName
        })
        //关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input',localName)
        // 提示更新成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast('请求失败')
      }

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