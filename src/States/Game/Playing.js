import State from "../State"; 

export default class Playing extends State
{
    constructor(gameObject){
        super(gameObject);
    }

    enter (oldState)
    {
        super.enter(oldState);
        this.gameObject.stateLabel.setText(this.constructor.name);
        console.log("enter drolololo");
        //FB ads
        this.gameObject.scene.scene.loadAd();
    }

    exit(newState)
    {
        super.exit(newState);
        console.log("exit drolololo");
    }

    update(){

    }

}

