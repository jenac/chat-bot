'use strict'
require('babel-register')
const Wechat = require('wechat4u')
const qrcode = require('qrcode-terminal')
const fs = require('fs')
const request = require('request')

let bot
try {
  bot = new Wechat(require('../sync-data.json'))
} catch (e) {
  bot = new Wechat()
}

if (bot.PROP.uin) {
  bot.restart()
} else {
  bot.start()
}
bot.on('uuid', uuid => {
  qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
    small: true
  })
  console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid)
})

bot.on('user-avatar', avatar => {
  console.log('登录用户头像Data URL：', avatar)
})

bot.on('login', () => {
  console.log('登录成功')
  fs.writeFileSync('./sync-data.json', JSON.stringify(bot.botData))
})

bot.on('logout', () => {
  console.log('登出成功')
  fs.unlinkSync('./sync-data.json')
})

bot.on('contacts-updated', contacts => {
  let c = contacts.find(c=>c.NickName == '蓝天白云');
  if (c) {
    bot.updateRemarkName(c.UserName, 'my test 1');
    console.log(c);
  }
  console.log('联系人数量：', Object.keys(bot.contacts).length)
})

bot.on('error', err => {
  console.error('错误：', err)
})

bot.on('login', () => {
  let ToUserName = 'filehelper'
})

bot.on('message', msg => {
  console.log(`----------${msg.getDisplayTime()}----------`)
  console.log(bot.contacts[msg.FromUserName].getDisplayName())
})
