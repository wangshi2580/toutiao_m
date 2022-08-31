import request from "@/units/request";
//文章点赞接口
export const getLike = target => {
        return request({
            method: 'POST',
            url: '/v1_0/article/likings',
            data: {
                target
            }
        })
    }
    //文章取消点赞接口
export const delLike = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`,
    })
}