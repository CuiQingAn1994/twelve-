import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import site from '../pages/site.vue'
import myBankCard from '../pages/myBankCard.vue'
import withdraw from '../pages/withdraw.vue'
import addBank from '../pages/addBank.vue'
import wRecord from '../pages/wRecord.vue'
import qrcode from '../pages/qrcode.vue'
// 订单列表
import lottery from '../pages/lottery.vue'
// 订单详情
import lottDetail from '../pages/lottDetail.vue'
// 消费流水
import spendList from '../pages/spendList.vue'
// 金豆记录
import beanRecord from '../pages/beanRecord.vue'
// 安全中心
import safe from '../pages/safe.vue'
// 索要彩票
import getlottery from '../pages/getlottery.vue'
// 彩票邮寄
import lottMail from '../pages/lottMail.vue'
// 我的推广
import myExpend from '../pages/myExpend.vue'
// 商城订单
import shopOrder from '../pages/shopOrder.vue'
//商品订单详情
import shopDetail from '../pages/shopDetail.vue'

// 我的业绩
import myachieve from '../pages/myachieve.vue'
// 推广设备
import myequalist from '../pages/myequalist.vue'
// 关于
import concise from '../pages/concise.vue'
// 帮助
import help from '../pages/help.vue'
import helpAnswer from '../pages/helpAnswer.vue'

// 错误
import err from '../pages/err.vue'
// 公告
import notice from '../pages/notice.vue'
// 空白页
import blankPage from '../pages/blankPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'site',
      component: site
    },
    {
      path: '/site',
      name: 'site',
      component: site
    },
     {
      path: '/myBankCard',
      name: 'myBankCard',
      component: myBankCard
    },
     {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
     {
      path: '/addBank',
      name: 'addBank',
      component: addBank
    },
     {
      path: '/wRecord',
      name: 'wRecord',
      component: wRecord
    },
     {
      path: '/qrcode',
      name: 'qrcode',
      component: qrcode
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: lottery
    },
     {
      path: '/lottDetail',
      name: 'lottDetail',
      component: lottDetail
    }
    ,
     {
      path: '/spendList',
      name: 'spendList',
      component: spendList
    },
     {
      path: '/beanRecord',
      name: 'beanRecord',
      component: beanRecord
    },
     {
      path: '/safe',
      name: 'safe',
      component: safe
    },
     {
      path: '/getlottery',
      name: 'getlottery',
      component: getlottery
    },
     {
      path: '/lottMail',
      name: 'lottMail',
      component: lottMail
    },
     {
      path: '/myExpend',
      name: 'myExpend',
      component: myExpend
    },
     {
      path: '/shopOrder',
      name: 'shopOrder',
      component: shopOrder
    },
    {
      path: '/shopDetail',
      name: 'shopDetail',
      component: shopDetail
    },
     {
      path: '/myachieve',
      name: 'myachieve',
      component: myachieve
    },
     {
      path: '/myequalist',
      name: 'myequalist',
      component: myequalist
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
     {
      path: '/helpAnswer',
      name: 'helpAnswer',
      component: helpAnswer
    },
    {
      path: '/concise',
      name: 'concise',
      component: concise
    },
    {
      path: '/err',
      name: 'err',
      component: err
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/blankPage',
      name: 'blankPage',
      component: blankPage
    }

  ]
})
