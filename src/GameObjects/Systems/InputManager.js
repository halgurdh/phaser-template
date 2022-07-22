const InputManager = function (controllerObjects, ...args) {
        //controllerObjects must be of type {} object, at least one controller class
        this.controllers = {};

        this.updateController = function(){
            this.controller.update(this); 
        }

        //check if single controller object
        if(Object.keys(controllerObjects).length == 1){
            this.controller = new controllerObjects[Object.keys(controllerObjects)[0]](this);
            return this;
        }

        for (var controller in controllerObjects) {
            if(controller.toString() != "default"){
                this.controllers[controller] = new controllerObjects[controller](this);
            }
        }

        this.setController = function (newController){
            this.controller = this.controllers[newController];
        }

        return this;
}
export default InputManager;