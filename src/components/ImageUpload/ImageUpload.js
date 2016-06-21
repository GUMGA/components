(function () {
    'use strict';


    ImageUpload.$inject = ['$parse','$uibModal','GumgaMimeTypeService']

    function ImageUpload($parse,$uibModal,GumgaMimeTypeService) {

        let template = `
        <input type="file" class="file-input" ng-hide="true" />
        <div class="row">
            <div class="area" ng-show="ctrl.crop">
                <div class="col-md-7">
                    <div class="area-camera" ng-hide="ctrl.myImage">
                        <svg version="1.1" class="svg-camera" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                            <g>
                            <path d="M430.4,147h-67.5l-40.4-40.8c0,0-0.2-0.2-0.3-0.2l-0.2-0.2v0c-6-6-14.1-9.8-23.3-9.8h-84c-9.8,0-18.5,4.2-24.6,10.9l0,0.1 l-39.5,40H81.6C63,147,48,161.6,48,180.2v202.1c0,18.6,15,33.7,33.6,33.7h348.8c18.5,0,33.6-15.1,33.6-33.7V180.2 C464,161.6,448.9,147,430.4,147z M256 365.5c-50.9,0-92.4-41.6-92.4-92.6c0-51.1,41.5-92.6,92.4-92.6c51,0,92.4,41.5,92.4,92.6 C348.4,323.9,307,365.5,256,365.5z M424.1,200.5c-7.7,0-14-6.3-14-14.1s6.3-14.1,14-14.1c7.7,0,14,6.3,14,14.1 S431.8,200.5,424.1,200.5z"/>
                            <path d="M256,202.9c-38.6,0-69.8,31.3-69.8,70c0,38.6,31.2,70,69.8,70c38.5,0,69.8-31.3,69.8-70C325.8,234.2,294.5,202.9,256,202.9 z"/>
                            </g>
                        </svg>
                    </div>
                    <div class="area-crop" ng-show="ctrl.myImage">
                        <img-crop image="ctrl.myImage" result-image="ctrl.myCroppedImage" result-image-size="ctrl.resultImageSize" area-type="square"></img-crop>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="area-preview" style="width: {{ctrl.resultImageSize}}px height: {{ctrl.resultImageSize}}px">
                        <img ng-src="{{ctrl.myCroppedImage}}" style="width: 100%" />
                    </div>
                    <button class="btn btn-default btn-block" type="button" ng-disabled="!ctrl.myImage" ng-show="ctrl.images.length < ctrl.maxFiles" ng-click="ctrl.upload()">
                        <span class="glyphicon glyphicon-cloud-upload"></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="list">
                    <a class="thumbnail photo" ng-repeat="img in ctrl.images" style="width: {{ctrl.thumbImageSize}}px">
                        <img ng-src="{{img}}">
                        <span class="glyphicon glyphicon-remove pull-right remove" ng-click="ctrl.remove(img, $index)"></span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" ng-show="!ctrl.crop">
                <button class="btn btn-default btn-block btn-select" type="button" ng-disabled="ctrl.images.length >= ctrl.maxFiles">
                    <span class="glyphicon glyphicon-cloud-upload"></span>
                </button>
            </div>
        </div>
        `
        
        /**
         * @TODO: 
         * validar máximo de imagens permitidas
         * validar tipos de arquivos
         */
        
        controller.$inject = ['$scope','$element','$attrs']
        
        function controller($scope, $element, $attrs) {
            let ctrl = this
            
            const ERR_MSGS = {
                noUpload: 'É necessário um atributo upload-method no componente, contendo uma função para upload.',
                noRemove: 'É necessário um atributo remove-method no componente, contendo uma função para remoção.'
            }
            
            if (!$attrs.uploadMethod) console.error(ERR_MSGS.noUpload)
            if (!$attrs.removeMethod) console.error(ERR_MSGS.noRemove)

            ctrl.images           = (ctrl.images)               ? ctrl.images               : []
            ctrl.resultImageSize  = ($attrs.resultImageSize)    ? $attrs.resultImageSize    : 250
            ctrl.thumbImageSize   = ($attrs.thumbImageSize)     ? $attrs.thumbImageSize     : 100
            ctrl.maxFiles         = ($attrs.maxFiles)           ? $attrs.maxFiles           : 10
            ctrl.crop             = ($attrs.crop)               ? ctrl.crop                 : true

            function _reset() {
                ctrl.myImage = ''
                ctrl.myCroppedImage = ''
            }
            function _uploadSuccess(image) {
                ctrl.images.push(image)
                if ($attrs.onUploadSuccess) ctrl.onUploadSuccess(image)
            }
            function _uploadError(error) {
                if ($attrs.onUploadError) ctrl.onUploadError(error)
                console.error(error)
            }
            function _removeSuccess(image, index) {
                ctrl.images.splice(index, 1)
                if ($attrs.onRemoveSuccess) ctrl.onRemoveSuccess(image)
            }
            function _removeError(error) {
                if ($attrs.onRemoveError) ctrl.onRemoveError(error)
                console.error(error)
            }
             
            let reset           = _reset,
                uploadSuccess   = _uploadSuccess,
                uploadError     = _uploadError,
                removeSuccess   = _removeSuccess,
                removeError     = _removeError
                
            reset()
            
            let handleOpenSelect = evt => {
                if (ctrl.images.length < ctrl.maxFiles) document.querySelector('.file-input').click()
            }
            // let openModalCrop = (image) => {
            //     const controllerAs = 'modalCtrl'
            //     const resolve = { imageCrop: () => image }
                
            //     controller.$inject = ['$scope','$uibModalInstance', 'imageCrop']
                
            //     function controller($scope, $uibModalInstance, imageCrop){
            //         let modalCtrl = this;
            //         modalCtrl.imageCrop = imageCrop
            //         modalCtrl.imageCropped = ''
            //         modalCtrl.cancel = () => $uibModalInstance.dismiss('cancel');
            //         modalCtrl.save   = (image) => $uibModalInstance.close();
            //     }
                
            //     let template = `
            //     <div class="modal-header">
            //         <h3 class="modal-title">Modal</h3>
            //     </div>
            //     <div class="modal-body">
            //         <img-crop image="modalCtrl.imageCrop" result-image="modalCtrl.imageCropped" area-type="square"></img-crop>
            //     </div>
            //     <div class="modal-footer">
            //         <button type="button" class="btn btn-default" ng-click="modalCtrl.cancel()">Retornar</button>
            //         <button type="button" class="btn btn-primary" ng-click="modalCtrl.save(modalCtrl.imageCrop)">Salvar</button>
            //     </div>`
                
            //     $uibModal
            //     .open({ controller, template, controllerAs, resolve })
            //     .result
            //     .then(
            //         image => {
            //             ctrl.imageCropped = image
            //         },
            //         reject => ctrl.imageCropped = ''
            //     )
            // }
            let handleFileSelect = evt => {
                let file = evt.currentTarget.files[0],
                    reader = new FileReader();
                reader.onloadend = evt => {
                    $scope.$apply(($scope) => {
                        ctrl.myImage = evt.target.result;
                        if (!ctrl.crop) ctrl.upload(ctrl.myImage)
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('.file-input')).on('change', handleFileSelect)
            angular.element(document.querySelector('.svg-camera')).on('click', handleOpenSelect)
            angular.element(document.querySelector('.btn-select')).on('click', handleOpenSelect)
            
            ctrl.upload = (image) => {
                if (!image && ctrl.crop) image = ctrl.myCroppedImage
                ctrl.uploadMethod({ image: image }).then(
                    res => uploadSuccess(res.data),
                    err => uploadError(err.data)
                )
                reset()
            }
            ctrl.remove = (image, index) => {
                ctrl.removeMethod({ image: image }).then(
                    res => {
                        ctrl.images.splice(index, 1)
                        removeSuccess(res.data, index)
                    },
                    err => removeError(err.data)
                )
            }
        }

        return {
            restrict: 'E',
            scope: {
                images:          '=',
                crop:            '=?',
                uploadMethod:    '&',
                onUploadSuccess: '&?',
                onUploadError:   '&?',
                removeMethod:    '&',
                onRemoveSuccess: '&?',
                onRemoveError:   '&?'
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
