class Tap {
    constructor(target) {

        target.scene.input.on('pointerdown', function (pointer) {
            console.log("Tap");
            target.x = pointer.x;
            target.y = pointer.y;

        },this);
        
    }
    
    update (target){

    }

}

export default Tap;