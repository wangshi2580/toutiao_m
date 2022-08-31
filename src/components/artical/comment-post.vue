  <template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50"
      placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="onSend" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comments';
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  inject:['articleId'],
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async onSend() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
      });
      try {
        const { data } = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        //   console.log(data);
        this.message = ""
        this.$emit('onSuccess', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 22px 0 22px 22px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 50px;
    border: none;
    padding: 0;
    color: #6ba3d8;

    &::before {
      display: none;
    }
  }
}
</style>