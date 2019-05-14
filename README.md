# yapi-plugin-oauth2 

第三方插件，基于Oauth2协议登录，在生成的配置文件中，添加如下配置即可：

```
"plugins": [
    {
      "name": "oauth2",
      "options": {
        "type": "oauth2",
        "hostscheme": "http",
        "hostname" : "your.oauth2server",
        "loginPath": "/api/v4/user",
        "authPath" : "/oauth/authorize",
        "tokenPath" : "/oauth/token",
        "redirectUri" : "http://your.yapiserver/api/plugin/oauth2/callback",
        "appId" : "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "appSecret" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "emailKey" : "emailkey",
        "userKey" : "usernamekey",
        "emailPostfix" : "@yapi.com"
      }
    }
  ]
```
使用注意:

- Oauth2服务器用户信息需要提供: `email`和`username`两个字段，如果字段名不一致，可以通过`emailKey`和`userKey`设置，如果没有电子邮箱字段，可以使用用户名字段+`emailPostfix`属性设置默认电子邮箱地址（电子邮箱是Yapi用户唯一标志），如果有`emailKey`默认使用`emailKey`获取邮箱信息

这里面的配置项含义如下：  

- `hostscheme` oauth2服务器的访问协议
- `hostname` oauth2服务器的访问地址
- `loginPath` 获取用户信息路径
- `authPath` 授权路径
- `tokenPath` 获取access_token路径
- `redirectUri` 重定向路径
- `emailKey` 用户信息电子邮件字段key
- `userKey` 用户信息用户名字段key
- `emailPostfix` 邮箱后缀

