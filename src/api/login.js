import request from "@/units/request";
export const login = data => {
    return request({
        method: 'POST',
        url: 'v1_0/authorizations',
        data
    })
}
export const send = mobile => {
    return request({
        method: 'GET',
        url: `v1_0/sms/codes/${mobile}`,
    })
}
export const getUser = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
    })
}
export const getUserPd = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels',
    })
}
export const getArtcial = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}