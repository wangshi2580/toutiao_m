import request from "@/units/request";
//获取文章评论
export const getComment = params => {
        return request({
            method: 'GET',
            url: '/v1_0/comments',
            params
        })
    }
    //对评论或评论回复点赞
export const getCommentLike = target => {
        return request({
            method: 'POST',
            url: '/v1_0/comment/likings',
            data: {
                target
            }
        })
    }
    //取消对评论或评论回复点赞
export const delCommentLike = target => {
        return request({
            method: 'DELETE',
            url: `/v1_0/comment/likings/${target}`,
        })
    }
    // 对文章或者评论进行评论
export const addComment = data => {
    return request({
        method: 'POST',
        url: `/v1_0/comments`,
        data
    })
}