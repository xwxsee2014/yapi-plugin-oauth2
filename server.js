const request = require('request');
const controller = require('./controller');

module.exports = function (options) {
  const {emailPostfix, emailKey, userKey, hostscheme, hostname, loginPath} = options;

  this.bindHook('third_login', (ctx) => {
    let token = ctx.request.body.token || ctx.request.query.token;
    return new Promise((resolve, reject) => {
      request(hostscheme + "://" + hostname + loginPath + "?access_token=" + token, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let result = JSON.parse(body);
          if (result) {
            let ret = {
              email: (emailKey != undefined && emailKey.length > 0) ? result[emailKey] : (result[userKey] + emailPostfix),
              username: result[userKey]
            };
            resolve(ret);
          } else {
            reject(result);
          }
        }
        reject(error);
      });
    });
  });

  this.bindHook('add_router', function(addRouter) {
    addRouter({
      controller: controller,
      method: 'get',
      path: 'oauth2/callback',
      action: 'oauth2Callback'
    });
  });
}