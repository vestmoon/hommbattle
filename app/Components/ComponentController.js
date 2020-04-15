define('app/Components/ComponentController.js', function () {
    let instance = null;
    return class ComponentController {
        
        constructor() {
            if(!instance){
                instance = this;
                this.listModule = [];
            }
            return instance;
        }
        
        addModule(name) {
            this.listModule.push(name);
        }
    }

});
