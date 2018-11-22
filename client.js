import React, { Component } from 'react'

module.exports = function (options) {
  const handleLogin = () => {
    const { hostscheme, hostname, redirectUri, authPath, appId } = options;
    let ret = encodeURIComponent(redirectUri);
    let redirectURL = hostscheme + "://" + hostname + authPath  + '?client_id=' 
      + appId + '&response_type=code&state=test1234&redirect_uri=' + ret;
    location.href = redirectURL;
  }

  const QssoComponent = () => (
    <button onClick={handleLogin} className="btn-home btn-home-normal" >Gitlab登录</button>
  )

  this.bindHook('third_login', QssoComponent);
};










