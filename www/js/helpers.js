App.helpers = {
  logined: function(){
    return localStorage.accessToken != undefined && localStorage.accessToken != ''
  },

  doLogin: function(){
    if(!App.helpers.logined()){
      App.helpers.modal.show();
    }
  }
}
