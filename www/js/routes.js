angular.module('starter.routes', {})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home',{
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })

    .state('app.cart', {
      url: "/cart",
      views: {
        'menuContent': {
          templateUrl: "templates/cart.html",
          controller: 'CartCtrl'
        }
      }
    })

    .state('app.sampleorders', {
      url: "/sampleorders",
      views: {
        'menuContent': {
          templateUrl: "templates/sampleorders.html",
          controller: 'SampleOrderCtrl'
        }
      }
    })

    .state('app.orders', {
      url: '/orders',
      views: {
        'menuContent': {
          templateUrl: 'templates/orders.html',
          controller: 'OrderCtrl'
        }
      }
    })

    .state('app.favorites', {
      url: '/favorites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favorites.html',
          controller: 'FavoriteCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/sampleorder/:sampleorderid",
      views: {
        'menuContent': {
          templateUrl: "templates/sampleorder.html",
          controller: 'SampleOrderDetailCtrl'
        }
      }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
