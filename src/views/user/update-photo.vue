<template>
  <div class="updatePhoto">
    <img
    class="image"
    :src="img"
    ref="img"
    />
    <footer>
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="finish" @click="onFinish">完成</div>
    </footer>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {editUserPhoto} from '@/api/user'
export default {
    props:{
        img:{
            type:[String,Number],
            required:true
        }
    },
    data(){
        return {
            cropper:null
        }
    },
    
    mounted(){
        const image = this.$refs.img
         this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        // autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable:true

        
})
    },
    methods:{
        onFinish(){
            this.cropper.getCroppedCanvas().toBlob ( blob  => {
                this.editPhoto(blob)
                })
            },
            
      async editPhoto(blob){
        this.$toast.loading({
            message:'保存中',
            forbidClick:true,
            duration:0
            })
        const formData = new FormData();
        formData.append('photo', blob);
        try {
            const {data} =await editUserPhoto(formData)
            console.log(data);
            // 关闭弹层
            this.$emit('close')
            // 更新视图
            this.$emit('update-photo',data.data.photo)
             // 提示更新成功
            this.$toast.success('更新成功')
        } catch (error) {
            this.$$emit('修改失败')
        }
        }
        },

    
}
</script>

<style scoped lang="less">
.updatePhoto {
    background-color: #000;
    height: 100%;
    .image {
    display: block;
    max-width: 100%;
}
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    .cancel,.finish{
        width: 60px;
        text-align: center;
        font-size: 15px;
        color: #fff;
    }
}
}

</style>