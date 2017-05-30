import templateUrl from './<%= name %>.tpl.html'
import './<%= name %>.scss'

class <%= upCaseName %>Controller {
    constructor() {
        'ngInject';

        this.name = '<%= name %>';
    }
}

export const <%= upCaseName %>Component = {
    bindings: {},
    templateUrl,
    controller: <%= upCaseName %>Controller,
    controllerAs: 'vm'
};
