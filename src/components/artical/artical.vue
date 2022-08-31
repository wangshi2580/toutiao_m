<template>
  <div class="artical-container">
        <van-cell-group >
            <van-cell 
            :to="{
            name:'article',
            params:{
            articleId:art_item.art_id
            }
        }">
                <div slot="title" class="title van-multi-ellipsis--l2">{{art_item.title}}</div>
                <div slot="label" class="imgList">
                    <div class="img-item" v-for="item,index in art_item.cover.images" :key="index">
                            <van-image
                        v-if="art_item.cover.type===3"
                        :src="item"
                        fit="cover"
                        class="img"
                        />

                    </div>
                </div>
                <div slot="label" id="obj">
                    <span class="aut">{{art_item.aut_name}}</span>
                    <span class="count">{{art_item.comm_count}}评论</span>
                    <span class="date">{{art_item.pubdate|relativeTime}}</span>
                </div>
                <div slot="default">
                    <van-image
                        v-if="art_item.cover.type===1"
                        width="100"
                        height="100"
                        :src="art_item.cover.images[0]"
                        fit="cover"
                        />
                </div>
            </van-cell>
        </van-cell-group>
  </div>
</template>

<script>
export default {
    props:{
        art_item:{
            required:true,
            typeof:Object
        },
        
    }
  
}
</script>

<style scoped lang="less">
.artical-container {
    .title {
        font-size: 15px ; 
    }
   .imgList {
    display: flex;
    padding: 10px 0 15px 0;
    .img {
       flex: 1;
       width: 100px;
       height: 75px;
        margin-right: 2px;
    }
   }
   #obj {
    padding-top: 20px;
    span {
        margin-right: 12px;
        font-size: 10px;
    }
   }
   .van-cell__value {
    flex: unset;
    margin-left: 5px;
    
   }
}
  

</style>