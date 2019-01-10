var Koa = require('koa')
var wechat = require('./control/middleware.js')
const reply = require('./wechat/reply.js')
const { initSchemas, connect } = require('./app/database/init.js')

var config = {
    db: 'mongodb://localhost:27017/wechat',
    wechat: {
        appID: 'wx930d8776d1651bba',
        appSecret: 'c9023528601289ef457d2e8f61ef6413',
        Token: 'wohuizhenxini21'
    }
}


;
(async() => {
    await connect(config.db)
    initSchemas()
        //     // 测试token存储
        // const { test } = require('./wechat/index.js')
        // await test()
    var app = new Koa()

    app.use(wechat(config.wechat, reply))

    app.listen(3000)
    console.log('Listening:3000')
})()