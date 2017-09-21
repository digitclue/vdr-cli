import templateUrl from './<%= camelName %>.tpl.html';

import './<%= camelName %>.scss';

class <%= classifiedName %>Controller {
    constructor($modalInstance) {
        'ngInject';

        this.$uibModalInstance = $modalInstance;
    }

    dismissModal(e) {
        e.preventDefault();

        this.$uibModalInstance.dismiss('Cancel');
    }
}


export const <%= classifiedName %>Modal = {
    templateUrl,
    controller: <%= classifiedName %>Controller,
    controllerAs: 'vm',
    keyboard: false,
    backdrop: 'static',
    windowClass: '<%= kebabName %>',
    resolve: {},
};
