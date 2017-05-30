import templateUrl from './<%= name %>.tpl.html'

import './<%= name %>.scss'

class <%= upCaseName %>Controller{
    constructor($modalInstance){
        'ngInject';

        this.$uibModalInstance = $modalInstance;
    }

    dismissModal(e){
        e.preventDefault();

        this.$uibModalInstance.dismiss('Cancel');
    }
}


export default {
    templateUrl,
    controller: <%= upCaseName %>Controller,
    controllerAs: 'vm',
    keyboard: false,
    backdrop: 'static',
    windowClass: '<%= kebabCaseName %>',
    resolve: {}
};
