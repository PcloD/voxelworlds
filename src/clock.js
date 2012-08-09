define(function(require, exports, module){
    
var clock = exports,
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;


clock.Clock = function () {
    this.running = false;
    this.interval = null;
    this.t0 = new Date();
    this.t = 0.0;
};
clock.Clock.prototype = {
    tick: function () {
        var t1 = new Date(),
            td = (t1-this.t0)/1000;
        this.t0 = t1;
        this.t += td;
        this.ontick(td);
    },
    start: function (element) {
        this.running = true;
        var self = this, f;
        if(requestAnimationFrame){
            requestAnimationFrame(f = function () {
                self.tick();
                if(self.running){
                    requestAnimationFrame(f, element);
                }
            }, element);
        }
        else {
            this.interval = window.setInterval(function() {
                self.tick();
            }, 1);
        }
        this.t0 = new Date();
    },
    stop: function() {
        if(this.interval){
            window.clearInterval(this.interval);
            this.interval = null;
        }
        this.running = false;
    },
    ontick: function() {}
};

});
