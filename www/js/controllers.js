angular.module('starter.controllers', ['ionic-datepicker'])

    .controller('DashCtrl', function ($scope, AuthenticationService, $state, $rootScope, $ionicPopup) {

        $scope.signIn = function (user) {

            if (user && user.username && user.password) {

                AuthenticationService.getToken(user);

            } else {


                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '<h4 style="white-space: nowrap; color: #e42012 ">请输入用户和密码！</h4>',
                    okText: '确定',
                    okType: 'button button-block button-calm'
                });

                //alertPopup.then(function (res) {
                //
                //});

            }

            $rootScope.$on('login-event', function(event, data) {

                var response = data.response;

                if (response && response.code) {

                    switch (response.code) {

                        case 6:
                            $state.go('tab.chats');
                            break;
                        default:

                            alert(response.message);
                            break;
                    }
                }

            });

            //$scope.$emit('customer_list_refresh');
        };
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ReportsNavigationCtrl', function ($scope, Chats) {

        $scope.visibleReportsTypes = ['订单', '终端销量', '验收单', '退补单'];


    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('CustomerCtrl', function ($scope, $state, CustomerService) {
        $scope.customers = [];

        $scope.dateCustomer = function (customer) {
            //open date picker

        };

        $scope.callHim = function (customer) {
            window.open('tel:' + customer.phone);
        };

        $scope.inputValue = null;
        $scope.searchCustomers = function (inputValue) {
            CustomerService.searchCustomers($scope, inputValue);
        }
    })

    .controller('CustomerDetailController', function ($scope, CustomerService, $stateParams, $ionicHistory) {

        $scope.customer = null;

        var customerId = $stateParams.customerId;

        $scope.goBack = function() {
            $ionicHistory.goBack();
        };

        var AMapArea = document.getElementById('mapContainer');

        AMapArea.parentNode.style.height = "90%";

        $scope.AMapId = 'mapContainer';

        $scope.geolocation;
        //加载地图，调用浏览器定位服务
        $scope.map = new AMap.Map('mapContainer', {
            resizeEnable: true
        });
        $scope.map.plugin('AMap.Geolocation', function() {
            $scope.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            $scope.map.addControl($scope.geolocation);
            AMap.event.addListener($scope.geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener($scope.geolocation, 'error', onError);      //返回定位出错信息
        });
        //获取当前位置信息
        $scope.getCurrentPosition = function() {
            $scope.geolocation.getCurrentPosition();
        }
        ;
        //监控当前位置并获取当前位置信息
        $scope.watchPosition = function() {
            $scope.geolocation.watchPosition();
        };

        //解析定位结果
        function onComplete(data) {
            var str = '<div>定位成功</div>';
            str += '<div>经度：' + data.position.getLng() + '</div>';
            str += '<div>纬度：' + data.position.getLat() + '</div>';
            str += '<div>精度：' + data.accuracy + ' 米</div>';
            str += '<div>是否经过偏移：' + (data.isConverted ? '是' : '否') + '</div>';
            result.innerHTML = str;

            $scope.$emit('map_created');
        };

        $scope.$on('map_created', function() {
            $scope.geolocation.getCurrentPosition();
        });

        //解析定位错误信息
        function onError(data) {
            var str = '<p>定位失败</p>';
            str += '<p>错误信息：'
            switch (data.info) {
                case 'PERMISSION_DENIED':
                    str += '浏览器阻止了定位操作';
                    break;
                case 'POSITION_UNAVAILBLE':
                    str += '无法获得当前位置';
                    break;
                case 'TIMEOUT':
                    str += '定位超时';
                    break;
                default:
                    str += '未知错误';
                    break;
            }
            str += '</p>';
            result.innerHTML = str;
        }
    });
