export default class State
{
    constructor(gameObject){
        this.gameObject = gameObject;
    }

    enter (oldState)
    {
        console.log("oldState:" + oldState.constructor.name);
    }

    exit(newState)
    {
        console.log(this);
        console.log("newState:" + newState.constructor.name);
    }

    update(){

    }

}
