const baseController = require('controllers/base.js');
const yapi = require('yapi.js');
const http = require('http');

class oauth2Controller extends baseController {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * oauth2回调
   * @param {*} ctx 
   */
  async oauth2Callback(ctx) {
    try {
      // 获取code和state  
      let oauthcode = ctx.request.query.code;
      if (!oauthcode) {
        return (ctx.body = yapi.commons.resReturn(null, 400, 'code不能为空'));
      }
      let oauthstate = ctx.request.query.state;
      if (!oauthstate) {
        return (ctx.body = yapi.commons.resReturn(null, 400, 'state不能为空'));
      }
      let ops = yapi.WEBCONFIG.plugins[0].options;
      // 通过code获取token
      let tokenpath = ops.tokenPath + '?client_id=' + ops.appId + '&client_secret=' 
      + ops.appSecret + '&code=' + oauthcode + "&grant_type=authorization_code&redirect_uri=" + encodeURIComponent(ops.redirectUri);
      let tokenResult = await this.requestInfo(ops, tokenpath, 'POST').then(function(res) {
        let jsonRes = JSON.parse(res);
        ctx.redirect('/api/user/login_by_token?token=' + jsonRes.access_token);
      }).catch(function(rej) {
        return {
          status_code: rej.statuscode,
          message: rej.statusMessage
        };
      });
      return ctx.body = yapi.commons.resReturn(tokenResult, 401, "授权失败");
    } catch (err) {
      ctx.body = yapi.commons.resReturn(null, 400, err.message);
    }
  }

  /**
   * 请求封装
   * @param {*} host 
   * @param {*} port 
   * @param {*} path 
   */
  requestInfo(ops, path, method) {
    return new Promise((resolve, reject) => {
      let req = '';
      let http_client = http.request(
        {
          host: ops.hostname,
          method: method,
          path: path
        },
        function(res) {
          res.on('error', function(err) {
            reject(err);
          });
          res.setEncoding('utf8');
          if (res.statusCode != 200) {
            reject({statuscode: res.statusCode, statusMessage: res.statusMessage});
          } else {
            res.on('data', function(chunk) {
              req += chunk;
            });
            res.on('end', function() {
              resolve(req);
            });
          }
        }
      );
      http_client.on('error', (e) => {
        reject({message: 'request error'});
      });
      http_client.end();
    });
  }
}

module.exports = oauth2Controller;