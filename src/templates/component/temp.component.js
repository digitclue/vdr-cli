import templateUrl from './<%= camelName %>.tpl.html';
import './<%= camelName %>.scss';

class <%= classifiedName %>Controller {
    constructor() {
        'ngInject';

        this.name = '<%= camelName %>';
    }
}

export const <%= classifiedName %>Component = {
    bindings: {},
    templateUrl,
    controller: <%= classifiedName %>Controller,
    controllerAs: 'vm',
};
