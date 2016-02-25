(function () {
    'use strict';
    Upload.$inject = ['$http', '$parse', '$timeout', '$compile'];
    function Upload($http, $parse, $timeout, $compile) {
        let defaultAvatar = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="128px" height="128px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
            <path id="avatar" fill="#cccccc" d="M490.579,383.029c-14.152-22.086-61.763-35.824-108.835-55.453c-47.103-19.633-58.268-26.439-58.268-26.439
                l-0.445-45.182c0,0,17.646-13.557,23.127-56.074c11.01,3.198,22.619-16.461,23.237-26.824c0.625-9.98-1.508-37.662-14.981-34.877
                c2.754-20.845,4.741-39.586,3.764-49.505c-3.495-36.295-39.23-74.578-94.182-74.578c-54.95,0-90.7,38.283-94.193,74.578
                c-0.978,9.919,1.019,28.661,3.758,49.505c-13.455-2.785-15.587,24.897-14.979,34.877c0.635,10.363,12.196,30.021,23.255,26.824
                c5.462,42.517,23.122,56.074,23.122,56.074l-0.441,45.182c0,0-11.178,6.807-58.268,26.439
                c-47.104,19.629-94.683,33.367-108.851,55.453c-12.7,19.777-8.882,114.875-8.882,114.875h470.946
                C499.462,497.904,503.281,402.806,490.579,383.029z"/>
        </svg>`
        
        let avatar = `
        <img id="avatar" ng-src="{{avatar}}" width="128px" height="128px">`

        let templateBebin = `
        <div class="full-width-without-padding">
            <div ng-click="fireClick()" ng-show="flag" class="col-md-1" tooltip="{{::tooltipText}}" tooltip-placement="right">`

        let templateEnd = `
            </div>
            <img src="#" alt="Uploaded Image" ng-show="!flag" class="img-rounded" style="object-fit: cover"/>
            <input type="file" name="upload" id="upload" ng-hide="true"/>
            <div class="col-md-12" style="padding-left: 0">
                <button type="button" class="btn btn-link" ng-hide="flag" ng-click="deleteImage()"> Delete Image <span class="glyphicon glyphicon-trash"></span></button>
            </div>
        </div>`

        link.$inject = ['$scope','$element','$attrs']
        
        function link($scope, $element, $attrs) {
            let model = $parse($attrs.attribute),
                modelSetter = model.assign,
                reader = new FileReader();
                
            $timeout(function(){
                let element = $element.find('input'),
                    image = $element.find('img')[0];
                    
                element.bind('change', function () {
                    console.log(element[0].files[0]);
                    $scope.$apply(function () {
                        let x;
                        modelSetter($scope, element[0].files[0]);
                        $scope.flag = false;
                        reader.onloadend = function () {
                            image.src = reader.result;
                            image.width = 200;
                            image.height = 200;
                            let x = $attrs.attribute.split('.');
                            $scope.uploadMethod({ image: $scope[x[0]][x[1]] })
                                .then((val) => {
                                    $scope.model.name = val.data;
                                });
                        };
                        reader.readAsDataURL(element[0].files[0]);
                    });
                });
            });


            $scope.fireClick = function () {
                $timeout(() => {
                    document.getElementById('upload').click();
                });
            }

            $scope.$watch('model', () => {
                if ($scope.model) {
                    if ($scope.model.bytes) {
                        $scope.flag = false;
                        image.src = 'data:' + $scope.model.mimeType + ';base64,' + $scope.model.bytes;
                        image.width = 200;
                        image.height = 200;
                    }
                } else {
                    $scope.model = {};
                }
            });

            if (!$attrs.attribute) console.error('You must pass an attribute to GumgaUpload')

            $scope.flag = true;

            function scaleSize(maxW, maxH, currW, currH) {
                var ratio = currH / currW;
                if (currW >= maxW && ratio <= 1) {
                    currW = maxW;
                    currH = currW * ratio;
                } else if (currH >= maxH) {
                    currH = maxH;
                    currW = currH / ratio;
                }
                return [currW, currH];
            }

            $scope.deleteImage = function () {
                image.src = '';
                $scope.flag = true;
                element[0].files = [];
                $scope.deleteMethod();
            };

            
            let template = ``;
            template = template.concat(templateBebin);
            if ($scope.avatar) {
                template = template.concat(avatar);
            } else {
                template = template.concat(defaultAvatar);
            }
            template = template.concat(templateEnd);
            $element.append($compile(template)($scope));
        }
        return {
            restrict: 'AE',
            scope: {
                model: '=attribute',
                uploadMethod: '&',
                deleteMethod: '&',
                tooltipText: '@',
                avatar: '@'
            },
            link: link 
        };
    }

    angular.module('gumga.directives.upload', [])
        .directive('gumgaUpload', Upload);

})();
