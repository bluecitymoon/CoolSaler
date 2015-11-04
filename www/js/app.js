// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var user = null;
var mode = 'DEBUG';
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .constant('basicURL', 'http://localhost:8080/crud/rest/')
    .constant('mapkey', 'f42572d0237047d15f2a6306b7e763b7')

    .constant('ServerRoot', 'http://www.hanthink.cc:808/hanthinkapi/')
    .config(function($httpProvider) {
    //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
    })
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive

            .state('sign-in', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'LoginCtrl'
            })

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.reporttypes', {
                url: '/reporttypes',
                views: {
                    'tab-reporttypes': {
                        templateUrl: 'templates/tab-report.html',
                        controller: 'ReportTypesCtrl'
                    }
                }
            })

            .state('report-search', {
                url: '/searchreport/:typeid',
                templateUrl: 'templates/search-report.html',
                controller: 'ReportSearchCtrl'

            })
            .state('tab.data', {
                url: '/data',
                views: {
                    'tab-data': {
                        templateUrl: 'templates/tab-data.html',
                        controller: 'DataCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.customer', {
                url: '/customer',
                views: {
                    'tab-customer': {
                        templateUrl: 'templates/tab-customer.html',
                        controller: 'CustomerCtrl'
                    }
                }
            })
            .state('customer-detail', {
                url: '/customer/:customerId',
                templateUrl: 'templates/customer-detail.html',
                controller: 'CustomerDetailController'
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/sign-in');
        $ionicConfigProvider.tabs.position('bottom');

    });
