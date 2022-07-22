const PoolManager = function (max) {

    this.pool = this.add.group();
    this.pool.maxSize = max;

    this.addToPool = function( max){
        for(var i =0; i<max ; i++){
            this.addOne();
        }

        this.filterCameras();
        return this;
    }

    this.reusePool = function(){

        //console.log(this.pool.getTotalFree() + "free");
        //console.log(this.pool.getTotalUsed() + "used");
        //console.log(this.pool);
        let refill = ~~(this.score /(10 - Math.random()*4)) + 1;    
        if(!this.pool.isFull()){
            this.addToPool(refill);
        }else{
            if(this.pool.getFirstDead()!= null){
                for(var i =0; i<refill ; i++){
                    this.pool.getFirstDead().spawn();
                }
            }
        }

        this.filterCameras();
        return this;
    }

    this.addOne = function(){
            //console.log("adding");
            var c = this.add.ninja(-300, this.centerY +300);
            this.pool.add(c);
            //this.pool.maxSize +=1;
            return c;
    }
    this.spoelDoor = function(child){
        this.pool.killAndHide(child);
        child.reset();
    }

    this.activatePool = function  () {

        this.pool.children.iterate(function (child) {
            child.spawn();
        });
        return this;
    }

    this.deactivatePool = function () {
        this.pool.children.iterate(function (child) {
            this.spoelDoor(child);
            
        },this);
        this.pool.clear(true,true);

        return this;    }

    this.updatePool = function(){
        //define pool update
        this.pool.children.iterate(function (child) {
            child.update();
        });

    }
    return this;
}

export default PoolManager;