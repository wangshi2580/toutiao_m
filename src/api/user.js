import request from "@/units/request";

// 关注用户接口
export const getFollow = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

//取消关注用户接口
export const delFollow = target => {
        return request({
            method: 'DELETE',
            url: `/v1_0/user/followings/${target}`,
        })
    }
    //获取用户个人资料
export const getUserInfo = () => {
        return request({
            method: 'GET',
            url: `/v1_0/user/profile`,
        })
    }
    // 编辑用户个人资料
export const editUserInfo = data => {
        return request({
            method: 'PATCH',
            url: '/v1_0/user/profile',
            data
        })
    }
    // 编辑用户照片资料（头像、身份证照片）
export const editUserPhoto = data => {
        return request({
            method: 'PATCH',
            url: '/v1_0/user/photo',
            data
        })
    }
    // 获取用户收藏列表
export const getCollects = params => {
        return request({
            method: 'GET',
            url: '/v1_0/article/collections',
            params
        })
    }
    // 获取用户阅读历史
export const getHistorys = params => {
        return request({
            method: 'GET',
            url: '/v1_0/user/histories',
            params
        })
    }
    // 获取用户的关注列表
export const getFollows = params => {
        return request({
            method: 'GET',
            url: '/v1_0/user/followings',
            params
        })
    }
    // 获取用户的粉丝列表
export const getFans = params => {
    return request({
        method: 'GET',
        url: '/v1_0/user/followers',
        params
    })
}