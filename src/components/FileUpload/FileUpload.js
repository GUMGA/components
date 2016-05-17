(function () {
    'use strict';


    FileUpload.$inject = ['$parse','GumgaMimeTypeService','$http']

    function FileUpload($parse,GumgaMimeTypeService,$http) {
    
        let template = `
        <div>
        <section class="drag">
            <span  class="glyphicon glyphicon-download-alt"></span>
        </section>
        <div style="margin-bottom: 10px">
            <input type="file" id="input" ng-hide="true" ng-model="file">
            <button type="button" ng-click="click()" class="btn btn-default">
                <span class="glyphicon glyphicon-search"></span> Selecionar
            </button>
            <button type="button" ng-disabled="queue.length == 0"ng-click="upload()" class="btn btn-default">
                <span class="glyphicon glyphicon-cloud-upload"></span> Enviar
            </button>
            <button type="button" ng-click="clear()" class="btn btn-default pull-right" ng-disabled="queue.length == 0">
                <span class="glyphicon glyphicon-trash"></span> Limpar
            </button>
        </div>
        <p class="alert alert-info" ng-show="queue.length == 0 && !alert">
            <span class="glyphicon glyphicon-info-sign"></span> Selecione um arquivo ou arraste e solte aqui
        </p>
        <p class="alert alert-danger" ng-show="queue.length == 0 && alert">
            <span class="glyphicon glyphicon-alert"></span> {{alert}}
        </p>
        <ul class="list-group" ng-show="queue.length > 0">
            <li class="list-group-item alert" style="background-color: #d7eac8" ng-repeat="file in queue">
                <div class="media">
                    <div class="media-left">
                        <span class="media-object glyphicon glyphicon-file" style="font-size: 32px"></span>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">{{file.name}}</h4>
                        <span>{{file.size}} KB</span>
                        <span></span>
                        <div class="progress">
                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="{{file.percent}}" aria-valuemin="0" aria-valuemax="100" style="width: {{file.percent}}%">
                                <span>{{file.percent || 0}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        </div>
        `
        
        link.$inject = ['$scope','$element','$attrs']
        
        function link($scope, $element, $attrs) {
            const ERR_MSGS = {
                noEndPoint: 'É necessário um atributo endpoint no componente, contendo uma URL de API REST que receberá os arquivos.'
            }
            
            if (!$attrs.endpoint) console.error(ERR_MSGS.noEndPoint)
            
            let element     = $element.find('input'),
                model       = $parse($attrs.model),
                modelSetter = model.assign,
                endpoint    = $attrs.endpoint,
                accepted    = ($attrs.accepted) ? $attrs.accepted.split(',') : false,
                maxSize     = ($attrs.maxSize) ? parseInt($attrs.maxSize) : false,
                stopEvent   = (event) => {
                    event.stopPropagation()
                    event.preventDefault()
                }

            function _validateAcceptedTypes(file) {
                return (accepted) ? GumgaMimeTypeService.validate(file.type, accepted) : true
            }
            function _validateMaxSize(file) {
                return (maxSize) ? (file.size <= (maxSize * 1024)) : true
            }
            
            let validateAcceptedTypes   = _validateAcceptedTypes,
                validateMaxSize         = _validateMaxSize
            
            const addFileToQueue = (file) => {
                $scope.queue.push({
                    type: file.type,
                    name: file.name,
                    size: Math.round((file.size / 1024)),
                    file: file
                })
            }
            
            $scope.queue = []
            
            $element.on('dragenter', (event) => {
                stopEvent(event)
                $element.find('section')[0].classList.add('dragOver')
            })
            $element.on('dragover', (event) => {
                stopEvent(event)
                $element.find('section')[0].classList.add('dragOver')
            })
            $element.on('drop', (event) => {
                stopEvent(event)
                $scope.$apply(() => angular.forEach(event.dataTransfer.files, (file) => addFileToQueue(file)))
                $element.find('section')[0].classList.remove('dragOver')
            })
            
            element.bind('change', () => {
                $scope.queue = []
                angular.forEach(element[0].files, (file, i) => {
                    let reader = new FileReader()
                    reader.onload = function() {
                        $scope.$apply(() => {
                            modelSetter($scope, file)
                            if (validateAcceptedTypes(file) && validateMaxSize(file)) {
                                addFileToQueue(file)
                            } else {
                                let alert = ['Erro: ']
                                if (validateAcceptedTypes(file)) alert.push(`Formatos permitidos ${accepted.join(', ')}. `)
                                if (validateMaxSize(file)) alert.push(`Máximo de ${maxSize}KB. `)
                                alert.push('Selecione outro.')
                                $scope.alert = alert.join('')
                            }
                        })
                    }
                    reader.readAsDataURL(file)
                })
            })
            
            let eventHandlers = {
                onLoadEnd:  ($attrs.onUploadComplete) ? $scope.onUploadComplete : angular.noop
            ,   onAbort:    ($attrs.onUploadAbort)    ? $scope.onUploadAbort    : angular.noop
            ,   onError:    ($attrs.onUploadError)    ? $scope.onUploadError    : angular.noop
            }
            
            let onProgress = (e, i) => $scope.$apply(() => $scope.queue[i].percent = Math.round((e.loaded / e.total) * 100))
            let onLoadEnd  = (e, i) => eventHandlers.onLoadEnd({event: e})
            let onAbort = (e, i) => eventHandlers.onAbort(e)
            let onError = (e, i) => eventHandlers.onError(e)         
            
            $scope.upload = function() {
                $scope.onUploadStart()
                angular.forEach($scope.queue, (curr, i) => {
                    let formDataFile = new FormData()
                    formDataFile.append($attrs.attribute, curr.file)
                    $http({
                        method: 'POST',
                        url: endpoint,
                        headers: {
                            'Content-Type': undefined,
                            __XHR__: () => {
                                return (xhr) => {
                                    xhr.upload.onprogress   = (e) => onProgress(e, i)
                                    xhr.upload.onloadend    = (e) => onLoadEnd(e, i)
                                    xhr.upload.onabort      = (e) => onAbort(e, i)
                                    xhr.upload.onerror      = (e) => onError(e, i)
                                };
                            }
                        },
                        data: formDataFile
                    }).then((response) => {
                        $scope.model.name = response.data
                    })
                })
            }
            $scope.click = function() {
                element[0].click();
            }
            $scope.clear = function() {
                $scope.queue = []
                $scope.alert = null
            }
        }

        return {
            restrict: 'E',
            template: template,
            scope: {
                model:              '='
            ,   uploadMethod:       '&'
            ,   deleteMethod:       '&'
            ,   onUploadStart:      '&?'
            ,   onUploadComplete:   '&?'
            ,   onUploadAbort:      '&?'
            ,   onUploadError:      '&?'
            },
            link: link
        }
    }


    angular.module('gumga.fileupload', [])
        .directive('gumgaFileUpload', FileUpload)
})();
