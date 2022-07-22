const RandomFrame = function(frames){  
    this.randomFrames = frames;
    this.setRandomFrame = function(frames, min,max){
        this.setFrame(frames[~~(Math.random()*max) + min]);
    }
    return this;
}

export default RandomFrame;