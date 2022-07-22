import State from "../State"; 

export default class GameOver extends State
{
    constructor(gameObject){
        super(gameObject);
    }

    enter (oldState)
    {
        super.enter(oldState);
        console.log("enter drolololo")
    }

    exit(newState)
    {
        super.exit(newState);
        console.log("exit drolololo")
        this.gameObject.scene.scene.showAd();

    }

    update(){

    }

}

