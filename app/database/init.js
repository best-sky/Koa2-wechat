const mongoose = require('mongoose')
const { resolve } = require('path')
const glob = require('glob')

mongoose.Promise = global.Promise
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js'))
        .forEach(require);
}

exports.connect = (db) => {
    let MaxConnectTimes = 0
    return new Promise((resolve) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect(db, { useNewUrlParser: true })
        mongoose.connection.on('disconnect', () => {
            MaxConnectTimes++
            if (MaxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('连接失败')
            }
        })
        mongoose.connection.on('err', err => {
            MaxConnectTimes++
            if (MaxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('连接失败')
            }
        })
        mongoose.connection.on('open', () => {
            resolve()
            console.log('连接成功')
        })
    })
}