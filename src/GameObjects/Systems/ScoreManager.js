const ScoreManager = function (...args) {
    this.score = 0;

    this.addScore = function (amount) {
        this.score += amount;
    }
    this.subtractScore = function (amount) {
        this.score -= amount;
    }
    this.resetScore = function () {
        if(this.score > this.highscore || this.highscore == null){
            this.saveScore();
        }
        this.score = 0;
    }
    this.saveScore = function (key) {
        this.highscore = this.score;
        window.localStorage.setItem(key, this.highscore );
    }
    this.loadScore = function (key) {
        this.highscore = window.localStorage.getItem(key);
        if(this.highscore == null){
            this.highscore = 0;
        }
        return this.highscore;
    }
    return this;

}

export default ScoreManager; 