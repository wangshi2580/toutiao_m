import request from "@/units/request";
export const getArticle = article_id => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${article_id}`
    })
}