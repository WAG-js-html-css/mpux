
<p align="center"><img src="https://m.360buyimg.com/jrqb/jfs/t30859/57/541351828/4843/455b13f3/5bf66f4eN9f102152.png" width="60" hegiht="60" /></p>
<h2 align="center">Mpux一个小程序框架</h2> 

`Mpux`提供小程序状态管理功能以及页面与组件的原型结构，让开发者能够使用继承的方式实现代码复用以及流程控制。同时它还提供了观察者模式以完善组件或页面的通讯功能。小程序的Page不能像React组件一样传递状态，所以采用了订阅的模式实现，同样模式很好的解决了一对多的通讯问题。它使用了ES6的Class方式声明。

## 特点
`Mpux`没有任何依赖库，纯手工打造高清源码。并且规模小，集成方便，使用灵活。

**Example：**

[Demo](https://github.com/VonCheng/mpux/blob/master/example.zip?raw=true)
 

## 集成

1.下载资源[mpux.zip](https://github.com/VonCheng/mpux/blob/master/dist/mpux.zip?raw=true)，解压拷贝文件到小程序工程中，然后就可义使用了。  

2.小程序入口文件需要做如下修改。

``` javascript
import Provider, { Application } from "./utils/mpux/index.js"
// 导入模型完成注册
require('./models/gym.m.js');
require('./models/home.m.js');

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

```
3.注册Model

``` javascript
import { Model, modelRegister } from "../utils/mpux.js"

class Home extends Model {
  static namespace = "home"
  data = {
    goods:[],
    message: "Holiday",
  }
}
modelRegister(Home);

```

4.在Page中使用

``` javascript
import { Controller, Selector } from "../../utils/mpux/index.js"

class Home extends Controller {
  constructor(props) {
    super(props);
    this.data = {
      abc: 112
    }
  }
  onLoad() {

  }
  toGym() {
    wx.navigateTo({
      url: '/pages/gym/index',
    })
  }
}
Selector(["home"])(Home);
```
5.在component中使用

``` javascript

import { Selector, Module } from "../utils/mpux/index.js"

class Comp extends Module {
  constructor(props) {
    super(props);
    this.data = {
      abc: 112
    }
  }
}
Selector(["gym"])(Comp);

```


## API

>#### Provider

**类型：** Func  
**用途：** 为App提过一个自定义的store，用来存储所有被管理的状态  
**参数**  
*Store*: 存储状态对象  
*App*: 已声明的Application类  

**返回值：** 无  
**语法**

``` javascript
Provider(store)(App);
// 例子
Provider({})(App);
```
>#### Selector

**类型：** Func  
**用途：** 选取一个或多个数据模型，以及若干个Action绑定到你的组件或页面上。  
**参数**  
*modelArray*: 选择的模型  
*actionMap*: 选择的事件  
*Class*: 绑定的组件或页面  

**返回值：** 无  
**语法**

``` javascript

Selector(modelArray, actionMap)(Class);

Selector([model,..], {action,..})(Controller | Module);
// 例子
Selector(["home"],{run})(Home);
```
>#### modelRegister

**类型：** Func   
**用途：** 将自定义的模型注册到容器中，以供pag或component去选取绑定。只需要注册一次，整个小程序的生命周期内可用。直到小程序被回收，这和store的生命周期相同   
**参数**  
*model*: 模型  

**返回值：** 无  
**语法**

``` javascript
modelRegister(model);
// 例子
modelRegister(Model);
```

>#### dispatch

**类型：** Func  
**用途：** 派发一个Action，一般情况不推荐使用。除非在组件或者page以外的地方  
**参数**  
*Action*：动作  
*callBack*：回调  
*restore*：是否清除该模型的所有记录  

**返回值：** 无  
**语法**

``` javascript
dispatch(Action);
// 例子
dispatch({type:"modelName", data: {num: "1232"}});
```

>#### rollBack

**类型：** Func  
**用途：** store回滚到初始化状态  
**参数**  
*modelName*：模型名称  

**返回值：** 无  
**语法**

``` javascript
rollBack(modelName);
// 例子
rollBack("modelName");
```

>#### Observer

**类型：** Object   
**用途：** 订阅模式   
**方法**  

***subscribe***

**用途：** 注册观察者  
**参数**  
*topic*：订阅号   
*func*：收到推送的响应   
*only*：是否支持多个订阅者   

***publish***

**用途：** 推送  
**参数**  
*topic*：订阅号  
*message*：消息内容  

***unsubscribe***

**用途：** 订阅者退订  
**参数**  
*ID*：订阅id 

***unsubscribeTopic***

**用途：** 订阅号退订，所有关联的订阅者都退订  
**参数**  
*topic*：订阅号 

**返回值：** ID （订阅ID）   
**语法**

``` javascript
observer.subscribe(topic, func, only);
observer.publish(topic, message);
// 例子
// a.js
observer.subscribe("refresh", (name, res) => {
  console.log("refreshing...");
}, true);
    
// b.js
observer.publish('refresh', {statue: true});

```

>#### Controller

**类型：** Class  
**用途：** 需要状态管理的小程序Page需要集成自Controller类

>#### Module

**类型：** Class  
**用途：** 需要状态管理的小程序component需要集成自Module类  

>#### Application

**类型：** Class  
**用途：** 小程序App需要集成自Application类

>#### Model

**类型：** Class  
**用途：** 小程序定义模型需要集成自Model类

## Support
wechat: chengpu552877
