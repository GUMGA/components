(function () {
    'use strict';


    FileUpload.$inject = ['$parse','GumgaMimeTypeService']

    function FileUpload($parse,GumgaMimeTypeService) {
    
        let template = `
        <div style="margin-bottom: 10px">
            <!--<input type="file" id="input" ng-model="file" multiple>-->
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
            <span class="glyphicon glyphicon-info-sign"></span> Selecione um arquivo
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
                    </div>
                </div>
            </li>
        </ul>
        `
        
        link.$inject = ['$scope','$element','$attrs']
        
        function link($scope, $element, $attrs) {
            let element     = $element.find('input'),
                model       = $parse($attrs.attribute),
                modelSetter = model.assign,
                accepted    = ($attrs.accepted) ? $attrs.accepted.split(',') : false,
                maxSize     = ($attrs.maxSize) ? parseInt($attrs.maxSize) : false,
                stopEvent   = (event) => {
                    event.stopPropagation()
                    event.preventDefault()
                }

            const addFileToQueue = (file) => {
                $scope.queue.push({
                    type: file.type,
                    name: file.name,
                    size: Math.round((file.size / 1024))
                })
            }
                        
            $scope.queue = []
            
            $element.on('dragenter', (event) => {
                stopEvent(event)
                console.log('enter')
                $element[0].classList.add('dragHover')
            })
            $element.on('dragleave', (event) => {
                stopEvent(event)
                console.log('leave')
                $element[0].classList.remove('dragHover')
            })
            $element.on('dragover', (event) => {
                stopEvent(event)
                console.log('over')
                $element[0].classList.add('dragHover')
            })
            $element.on('drop', (event) => {
                stopEvent(event)
                $scope.$apply(() => addFileToQueue(event.dataTransfer.files[0]))
            })
            
            element.bind('change', () => {
                angular.forEach(element[0].files, (file, i) => {
                    $scope.queue = []
                    let reader = new FileReader()
                    reader.onload = function() {
                        // console.log(reader.result)
                        $scope.$apply(function() {
                            modelSetter($scope, file)
                            let validAccept = (accepted) ? GumgaMimeTypeService.validate(file.type, accepted) : true,
                                validMaxSize = (maxSize) ? file.size <= (maxSize * 1024) : true;
                            
                            if (validAccept && validMaxSize) {
                                addFileToQueue(file)
                            } else {
                                let alert = ['Erro: ']
                                if (accepted) alert.push(`Formatos permitidos ${accepted.join(', ')}. `)
                                if (maxSize) alert.push(`Máximo de ${maxSize}KB. `)
                                alert.push('Selecione outro.')
                                $scope.alert = alert.join('')
                            }
                        })
                    }
                    reader.onloadend = function() {
                        $scope.uploadMethod();
                    }
                    reader.readAsDataURL(file)
                })
            })
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
                uploadMethod: '&',
                deleteMethod: '&'
            },
            link: link
        }
    }


    angular.module('gumga.fileupload', [])
        .directive('gumgaFileUpload', FileUpload)
})();
