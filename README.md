# random-password
能够简单的生成随机密码
- 目前特殊符号支持 "~", "!", "@", "#", "$", "%", "^", "&", "*", "?", "_", "-"

## 预览插件
![预览](https://i.loli.net/2021/07/19/Kb2WuFRr8LwnGaH.png)

## TODO
- 新增功能：修改特殊符号池；
- 新增功能：本地记录（optional）；
- 新增功能：增加快捷键；
- 新增功能：保存用户设置；
- ~~ 优化：随机算法，去除对 Mock 的依赖 ~~；
- 优化：更新 UI，优化视觉效果；
- 优化：elementUI 组件由原先的完整引入修改为部分引入；

## 插件使用
1. 下载并安装[utools](https://u.tools/)
2. 在插件中心搜索【随机密码】并下载，或者在[random-password](https://github.com/Moeyua/random-password/releases)下载安装包
3. 将文件拖入到主窗口安装插件
4. 启用插件
5. 通过关键字["密码", "随机", "password", "random", "pwd"]快速启动

## web使用（通过浏览器直接使用）
https://moeyua.github.io/random-password/



## utoos plugin
- utools版本在utools-plugin分支
- vue.config.js中的publicPath为`./`
- ~~ 将utools文件夹中的文件在打包后复制一份到dist根目录，并在修改后及时备份 ~~ 
- utools的配置文件会自动打包进dist目录

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
