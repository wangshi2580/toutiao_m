import request from "@/units/request";

export const getAllPd = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}
export const getUserPd = channel => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}
export const delUserPd = channelId => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`
    })
}