define('app/Controllers/ComponentController.js', function () {
    class ComponentController {
        
        constructor() {
            this.listModule = [];
        }
        
        addModule(name) {
            this.listModule.push(name);
        }
    }
    
    const control = new ComponentController();
    Object.freeze(control);
    return control;
});
