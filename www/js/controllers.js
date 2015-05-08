angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $timeout, $ionicBackdrop, $window) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    App.helpers.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
    $window.location.reload();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.showMenu = function() {
    if (localStorage.accessToken != undefined){
      return localStorage.accessToken == "" ? true : false;
    }else {
      return true;
    }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $ionicBackdrop.retain();
    $http({
      method: 'POST',
      url: App.domain + 'api/sessions',
      data: $scope.loginData,
    })
    .success(function(data){
      localStorage.setItem('accessToken', JSON.parse(data).access_token);
      $scope.closeLogin();
      $timeout(function() {
        $ionicBackdrop.release();
        console.log('login success');
      }, 1000);
    })
    .error(function(data){
      console.log(data);
      $timeout(function() {
        $ionicBackdrop.release();
        console.log('login failure');
      }, 1000);
    })
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  };

  $scope.logout = function(){
    var token = {access_token: localStorage.accessToken};
    $ionicBackdrop.retain();
    $http({
      method: 'POST',
      url: App.domain + 'api/sessions/access_token',
      params: token
    })
    .success(function(){
      localStorage.setItem('accessToken', '');
        $timeout(function() {
          $ionicBackdrop.release();

          console.log('logout successful');
        }, 1000);
    })
    .error(function(){
      $timeout(function() {
        $ionicBackdrop.release();
        console.log('logout failure');
      }, 1000);
    })
  }
})

.controller('SampleOrderCtrl', function($scope, $http) {
  $scope.load = function(){
    $http({
      method: 'GET',
      url: App.domain + '/api/sample_orders',
    })
    .success(function(data){
      $scope.sampleOrders = data;
    })
    .error(function(data){console.log(data)})
  };
})

.controller('SampleOrderDetailCtrl', function($scope, $stateParams, $http){
    $scope.loadSample = function(){
      $http({
        method: 'GET',
        url: App.domain + '/api/sample_orders/',
        params: {id: $stateParams.sampleorderid}
      })
      .success(function(data){
        $scope.sampleOrder = data;
        console.log($scope.sampleOrder);
      })
      .error(function(){
        console.log('failure')
      })
    }

    $scope.addToCart = function(){
      console.log($stateParams.sampleorderid)
    }
})

.controller('CartCtrl', function($scope, $http, $ionicBackdrop, $ionicPopup) {
  $scope.show = function(){
    return App.helpers.logined();
  }
  $scope.loginModal = function(){
    App.helpers.doLogin();
  }

  $scope.loadCart = function(){
    console.log(App.accessToken)
    if (!$scope.show()){
      return;
    }
    $http({
      method: 'GET',
      url: App.domain + 'api/carts/',
      params: {access_token: App.accessToken}
    })
    .success(function(data){
      console.log(data)
      $scope.items = data;
    })
  }

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: '提示',
      template: '您的购物车是空的，快去选择您喜爱的款式吧！'
    });
    alertPopup.then(function(res) {
      console.log('Thank you for using our app')
    });
  }

  $scope.createOrder = function(){
    if ($scope.items.length == 0){
      $scope.showAlert();
      return;
    }
    $ionicBackdrop.retain();
    $http({
      method: 'POST',
      url: App.domain + 'api/orders/',
      params: {access_token: App.accessToken}
    })
    .success(function(data){
      console.log(data)
      $scope.items = data;
      $ionicBackdrop.release();
    })
  }
})

.controller('HomeCtrl', function($scope){})
.controller('FavoriteCtrl', function($scope, $http){
  $scope.show = function(){
    return App.helpers.logined();
  }
  $scope.loadFavorites = function(){
    if (!$scope.show()){
      return;
    }
    $http({
      method: 'GET',
      url: App.domain + 'api/favorites',
      params: {access_token: App.accessToken}
    })
    .success(function(data){
      $scope.favorites = data;
      console.log($scope.favorites)
    })
  }
  $scope.loginModal = function(){
    App.helpers.doLogin();
  }
})

.controller('OrderCtrl', function($scope, $http){
  $scope.show = function(){
    return App.helpers.logined();
  }

  $scope.loadOrders = function(){
    if (!$scope.show()){
      return;
    }
    $http({
      method: 'GET',
      url: App.domain + 'api/orders',
      params: {access_token: App.accessToken}
    })
    .success(function(data){
      $scope.orders = data;
      console.log($scope.orders)
    })
  }
  $scope.loginModal = function(){
    App.helpers.doLogin();
  }
})
