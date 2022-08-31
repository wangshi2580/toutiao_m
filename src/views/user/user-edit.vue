<template>
  <div>
        <van-nav-bar
          title="个人信息"
          left-arrow
          @click-left="$router.back()"
    />
      <van-cell title="头像" is-link   @click="$refs.file.click()" >
          <van-image
          class="avatar"
            slot="default"
            round
            :src="user.photo"
          />
      <input type="file" hidden ref="file" @change="onFileChange"/>
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link @click="isNameShow=true"/>
       <van-popup v-model="isPhotoShow" position="bottom"  class="updatePhoto" :style="{ height: '100%' }">
          <updatePhoto :img="img" @close="isPhotoShow=false" v-if="isPhotoShow" @update-photo="user.photo=$event"></updatePhoto>
      </van-popup>
      <van-popup v-model="isNameShow" position="bottom" :style="{ height: '100%' }" class="updateName">
            <updateName @close="isNameShow=false" v-model="user.name" v-if="isNameShow"></updateName>
      </van-popup>
      <van-cell title="性别" :value="user.gender>0?'女':'男'" is-link @click="isGenderShow=true"/>
      <van-popup v-model="isGenderShow" position="bottom"  class="updateGender">
           <updateGender @close="isGenderShow=false" v-model="user.gender" v-if="isGenderShow"></updateGender>
      </van-popup>
      <van-cell title="生日" :value="user.birthday" is-link @click="isDateShow=true"/>
      <van-popup v-model="isDateShow" position="bottom"  class="updateDate">
          <updateDate  @close="isDateShow=false" v-model="user.birthday" v-if="isDateShow"></updateDate>
      </van-popup>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/user'
import updateName from '@/views/user/update-name.vue'
import updateGender from '@/views/user/update-gender.vue'
import updateDate from '@/views/user/update-date.vue'
import updatePhoto from './update-photo.vue'
export default {
  data() {
    return {
      user:{},
      isNameShow:false,
      isGenderShow:false,
      isDateShow:false,
      isPhotoShow:false,
      img:null
    }
  },
  created(){
    this.loadUserInfo()
  },
  methods:{
 async loadUserInfo(){
    try {
      const {data} = await getUserInfo()
      // console.log(data);
      this.user=data.data
    } catch (err) {
      this.$toast('请求失败，请重试')
    }
 },
 onFileChange(){
    const file = this.$refs.file.files[0]
    const re = window.URL.createObjectURL(file)
    this.isPhotoShow=true
    this.img=re
    // file-input如果选择了同一个文件 则不会处罚change事件
    // 解决办法是每次使用完毕把value清空
    this.$refs.file.value=""

 }
  },
  components:{
    updateName,
    updateGender,
    updateDate,
    updatePhoto
  }
}
</script>

<style scoped lang="less">
  .avatar{
    width: 27px;
    height: 27px;
  }
  .updateName {
    background-color: #f5f7f9;
  }
</style>