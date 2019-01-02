const Wechat = require('../control/index.js')
const mongoose = require('mongoose')

const Token = mongoose.model('Token')


const wechatCfg = {
    wechat: {
        appID: 'wx930d8776d1651bba',
        appSecret: 'c9023528601289ef457d2e8f61ef6413',
        token: 'wohuizhenxini21',
        getAccessToken: async() => {
            const res = await Token.getAccessToken()
            return res
        },
        saveAccessToken: async(data) => {
            const res = await Token.saveAccessToken(data)
            return res
        }
    }
}

// exports.test = async() => {
//     const client = new Wechat(wechatCfg.wechat)
//     const data = await client.fetchAccessToken()
//     console.log(data)
// }
exports.getWeChat = () => new WeChat(wechatCfg.wechat);