import request from "@/units/request";
//收藏文章接口
export const getCollect = target => {
        return request({
            method: 'POST',
            url: '/v1_0/article/collections',
            data: {
                target
            }
        })
    }
    //取消收藏文章接口
export const delCollect = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,
    })
}