var sha1 = require('sha1')
const getRawBody = require('raw-body')
const util = require('./util.js')
    // module.exports = function(config) {
    //     return function*(next) {
    //         var token = config.token
    //         var signature = this.query.signature
    //         var nonce = this.query.nonce
    //         var timestamp = this.query.timestamp
    //         var ecostr = this.query.ecostr
    //         var str = [token, timestamp, nonce].sort().join('')
    //         var sha = sha1(str)
    //         if (sha === signature) {
    //             this.body = ecostr + ''
    //             console.log('配置成功')
    //         } else {
    //             this.body = 'err'
    //         }
    //     }
    // }
module.exports = (config, reply) => {
    return async(ctx, next) => {
        console.log(ctx.query)
        const { signature, timestamp, nonce, echostr } = ctx.query
        const token = config.token
        let str = [token, timestamp, nonce].sort().join('')
        const sha = sha1(str)
        if (ctx.method === 'GET') {
            if (sha === signature) {
                ctx.body = echostr
            } else {
                ctx.body = 'failed'
            }
        } else if (ctx.method === 'POST') {
            if (sha !== signature) {
                return (ctx.body = 'failed')
            }
            const data = await getRawBody(ctx.req, {
                length: ctx.length,
                limit: '1mb',
                encoding: ctx.charset
            })

            const content = await util.parseXML(data)
            const message = util.formatMessage(content.xml)

            ctx.weixin = message
            await reply.apply(ctx, [ctx, next])

            const replyBody = ctx.body
            const msg = ctx.weixin
            const xml = util.tpl(replyBody, msg)
            console.log(xml)
            ctx.status = 200
            ctx.type = 'application/xml'
                // ctx.body = `
                // <xml><ToUserName><![CDATA[${message.FromUserName}]]></ToUserName><FromUserName><![CDATA[${message.ToUserName}]]></FromUserName><CreateTime>${parseInt(new Date().getTime()/1000,0)+''}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${message.Content}]]></Content></xml>
                // `
            ctx.body = xml
        }
    }
}