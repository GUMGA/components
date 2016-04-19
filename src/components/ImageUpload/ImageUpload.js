(function () {
    'use strict';


    ImageUpload.$inject = ['$parse','GumgaMimeTypeService']

    function ImageUpload($parse,GumgaMimeTypeService) {

        let template = `
        <style>
        .svg-camera {
            fill: #ccc;
            width: 100%;
        }
        .cameraArea {
            padding: 25%;
            background-color: #EAEAEA;
            border: 3px solid #ccc;
        }
        .cropArea {
            background: #E4E4E4;
            border: 3px solid #ccc;
            overflow: hidden;
            width:175px;
            height:175px;
        }
        </style>
        <div>Select an image file: <input type="file" class="fileInput" /></div>
        <div class="row">
            <div class="col-md-7">
                <div class="cameraArea" ng-hide="ctrl.myImage">
                    <svg version="1.1" class="svg-camera" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <g>
                        <path d="M430.4,147h-67.5l-40.4-40.8c0,0-0.2-0.2-0.3-0.2l-0.2-0.2v0c-6-6-14.1-9.8-23.3-9.8h-84c-9.8,0-18.5,4.2-24.6,10.9l0,0.1 l-39.5,40H81.6C63,147,48,161.6,48,180.2v202.1c0,18.6,15,33.7,33.6,33.7h348.8c18.5,0,33.6-15.1,33.6-33.7V180.2 C464,161.6,448.9,147,430.4,147z M256 365.5c-50.9,0-92.4-41.6-92.4-92.6c0-51.1,41.5-92.6,92.4-92.6c51,0,92.4,41.5,92.4,92.6 C348.4,323.9,307,365.5,256,365.5z M424.1,200.5c-7.7,0-14-6.3-14-14.1s6.3-14.1,14-14.1c7.7,0,14,6.3,14,14.1 S431.8,200.5,424.1,200.5z"/>
                        <path d="M256,202.9c-38.6,0-69.8,31.3-69.8,70c0,38.6,31.2,70,69.8,70c38.5,0,69.8-31.3,69.8-70C325.8,234.2,294.5,202.9,256,202.9 z"/>
                        </g>
                    </svg>
                </div>
                <div class="cropArea" ng-show="ctrl.myImage">
                    <img-crop image="ctrl.myImage" result-image="ctrl.myCroppedImage" result-image-size="ctrl.resultImageSize" area-type="square"></img-crop>
                </div>
            </div>
            <div class="col-md-1">&nbsp</div>
            <div class="col-md-4">
                <div>
                    <img ng-src="{{ctrl.myCroppedImage}}" />
                </div>
                <button class="btn btn-default btn-block" type="button" ng-click="ctrl.save()">Salvar</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <ul style="list-style: none; margin: 0; padding: 0">
                    <li style="float: left" ng-repeat="img in ctrl.resultImages">
                        <a class="thumbnail" style="width: {{ctrl.thumbImageSize}}px">
                            <img ng-src="{{img}}">
                        </a>                    
                    </li>
                </ul>
            </div>
        </div>
        `
        
        /**
         * @TODO: 
         * validar funções obrigatórioas
         * terminar estilos
         * validar máximo de imagens permitidas
         * validar tipos de arquivos
         * loading do componente
         */
        
        controller.$inject = ['$scope','$element','$attrs']
        
        function controller($scope, $element, $attrs) {
            let ctrl = this

            ctrl.resultImages     = (ctrl.resultImages)         ? ctrl.resultImages         : []
            ctrl.resultImageSize  = ($attrs.resultImageSize)    ? $attrs.resultImageSize    : 200
            ctrl.thumbImageSize   = ($attrs.thumbImageSize)     ? $attrs.thumbImageSize     : 100

            function _reset() {
                ctrl.myImage = ''
                ctrl.myCroppedImage = ''
            }
            function _uploadSuccess(image) {
                ctrl.resultImages.push(image)
                ($attrs.onUploadSuccess) ? ctrl.onUploadSuccess(image) : angular.noop
            }
            function _uploadError(error) {
                ($attrs.onUploadError) ? ctrl.onUploadError(error) : angular.noop
                console.error(error)
            }
            function _removeSuccess(image, index) {
                ctrl.resultImages.splice(index, 1)
                ($attrs.onRemoveSuccess) ? ctrl.onRemoveSuccess(image) : angular.noop
            }
            function _removeError(error) {
                ($attrs.onRemoveError) ? ctrl.onRemoveError(error) : angular.noop
                console.error(error)
            }
            
            let reset           = _reset,
                uploadSuccess   = _uploadSuccess,
                uploadError     = _uploadError,
                removeSuccess   = _removeSuccess,
                removeError     = _removeError
                
            reset()
            
            let handleFileSelect = evt => {
                let file = evt.currentTarget.files[0],
                    reader = new FileReader();
                    
                reader.onloadend = evt => {
                    $scope.$apply(($scope) => {
                        ctrl.myImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('.fileInput')).on('change', handleFileSelect)
            
            ctrl.upload = () => {
                ctrl.uploadMethod({ image: ctrl.myCroppedImage }).then(
                    (res) => uploadSuccess(res.data),
                    (err) => uploadError(err.data)
                )
                reset()
            }
            ctrl.remove = (image, index) => {
                ctrl.removeMethod({ image: image }).then(
                    (res) => removeSuccess(res.data, index),
                    (err) => removeError(err.data)
                )
            }
        }

        return {
            restrict: 'E',
            scope: {
                resultImages:       '=',
                
                uploadMethod:       '&',
                onUploadSuccess:    '&',
                onUploadError:      '&',
                
                removeMethod:       '&',
                onRemoveSuccess:    '&',
                onRemoveError:      '&'
            },
            bindToController: true,
            controllerAs: 'ctrl',
            controller,
            template
        }
    }


    angular.module('gumga.imageupload', ['ngImgCrop'])
        .directive('gumgaImageUpload', ImageUpload)
})();
