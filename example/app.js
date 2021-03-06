//app.js

import Provider, { Application, Controller, Selector } from "./utils/mpux.js"
import BaseController from "./super/base-vc.js";
// 导入模型完成注册
require('./models/gym.m.js');
require('./models/home.m.js');


//如果不想每个文件都导入mpux.js，可以挂载到global下
global.Controller = BaseController;
global.Application = Application;
global.Provider = Provider;
global.Selector = Selector;

class App extends Application {
  onLaunch() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
  globalData = {
    host: "http://10.13.91.14:8081",
    userInfo: null
  }
}
Provider({})(App);
