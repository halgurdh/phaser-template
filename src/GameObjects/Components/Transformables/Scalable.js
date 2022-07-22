const Scalable = function(sx, sy, duration){  
    this.scaling = this.scene.tweens.add({
            targets: this,
            scaleX: sx,
            scaleY: sy,
            duration: duration,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        return this;
}

export default Scalable;