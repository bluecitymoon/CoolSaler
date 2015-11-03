angular.module('starter.services', [])

    .factory('AuthenticationService', function($http, ServerRoot, $rootScope) {

      function getToken(user) {
          var json = "{code:6,token: \"0DPiKuNIrrVmD8IUCuw1hQxNqZc=\", message:\"登录成功\"}";
          alert(JSON.parse(json));

          $http({
              url: ServerRoot + 'jsyanzheng/yz',
              data: user,
              method: 'POST'
          }).success(function(response, status, headers, config) {


              $rootScope.$emit('login-event', {response : response});

          }).error(function(response, status, headers, config) {
                //TODO
          });

      }
      return {
        getToken: getToken
      }
    })

    .factory('StorageService', function ($window) {

        return {
            get: function (key) {

                var value = '';
                try {
                    value = $window.localStorage[key];
                } catch (e) {
                }

                return value;
            },
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            getArray: function (key) {
                return JSON.parse($window.localStorage[key] || '[]');
            }
        };
    })
    
    .factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

    .factory('CustomerService', function ($http, basicURL) {
      return {
        get: function ($scope, customerId) {
          $http({
            method: 'GET',
            url: basicURL + 'customer/' + customerId
          }).success(function (response, status, headers, config) {

            $scope.customer = response;

          }).error(function (response, status, headers, config) {

            $scope.customer = null;
          });
        },

        loadAllCustomers: function ($scope) {

          $http({
            method: 'GET',
            url: basicURL + 'customer/all'
          }).success(function (response, status, headers, config) {
            $scope.customers = response;

          }).error(function (response, status, headers, config) {
            $scope.customers = null;
          });

        },

        refreshCustomerList: function ($scope) {
          this.loadAllCustomers($scope);
          $scope.$broadcast('scroll.refreshComplete');

        },
        searchCustomers: function ($scope, inputValue) {

          var fakecustomers = [{id: 1, name: '江李明', company: '汉询软件', phone: '13761209451'}];
          $http({
            method: 'GET',
            url: basicURL + 'customer/search?queryParam=' + inputValue
          }).success(function (response, status, headers, config) {
            $scope.customers = response;

          }).error(function (response, status, headers, config) {
            $scope.customers = fakecustomers;
          });

        },
        save: function ($scope, $state, customerId) {
          $http({
            method: 'POST',
            url: basicURL + 'customer/save/',
            data: $scope.customer
          }).success(function (response, status, headers, config) {

            $scope.customer = response;

            $scope.$emit('customer_saved_event', {type: customerId, customer: response});

            $state.go('tab.customer');

          }).error(function (response, status, headers, config) {

            $scope.customers = null;
          });

        }
      }
    });
