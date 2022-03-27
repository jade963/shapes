console.log('moving ball is called')

/**
 * Ball that moves up and down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillC fill colour
 * @param {number} T total Tick interval (50 ticks = bout 1 second)
 * @param {number} H total Height covered by up/down motion
 */


class Grid{
    constructor(w,h,intervalW,strokeC,strokeW){
        this.w = w;
        this.h = h;
        this.intervalW = intervalW;
        this.strokeC = strokeC;
        this.strokeW = strokeW;
    }
    update(){
        this.draw()
    }
    draw(){
        // these loops also draw the grid outside as it is useful when analysing translations
        // and rotations (so you can ignore the negatives and use - instead
        // a loop for the vertical lines
        for(let i = -this.w; i <= this.w; i += this.intervalW) {
            this.drawLine(i, -this.h, i, this.h, this.strokeC, this.strokeW)
        }
        // a loop for the horizontals
        for(let j = -this.h; j <= this.h; j+= this.intervalW){
            this.drawLine(-this.w, j, this.w, j, this.strokeC, this.strokeW)
        }
    }
    drawLine(x_1, y_1, x_2, y_2, strokeC, strokeW){
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2, y_2);
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeC;
        ctx.lineWidth = strokeW;
        ctx.stroke();
    }
}

class MovingBall{
    constructor(x_b, y_b, r, fillC, T, H, xIS = 0){
        this.x_b = x_b;
        this.y_b = y_b;
        this.r = r;
        this.fillC = fillC;
        this.t = T*Math.random();
        this.T = T;
        this.H = H;
        this.xIntervalShift = xIS
    }
    update(){
        this.t += 1
        this.draw()
    }
    draw(){
        let y= this.linearinterpolate(this.t, this.T , this.H)
        //console.log(this.t)
        this.drawCircle(this.x_b, y+this.y_b, this.r)
        //this.drawCircle(this.x_b, this.y_b, this.r)
    }

    linearinterpolate(t, T, H){
        t = t%T;
        let y;
        if (t<T/2){
            y = (-2*H*t)/(T) + H
        }
        else{
            y = (2*H*t)/T - H
        }
        return y
    }
    drawCircle(x,y,r){
        ctx.beginPath()
        ctx.arc(x,y,r,0,2*Math.PI)
        ctx.fillStyle = this.fillC
        ctx.fill();
    }
}

// introducing left-right motion
class MovingBallBoth extends MovingBall{
    draw() {
            //get y value from the piecewise function
            let y = this.linearinterpolate(this.t, this.T, this.H)
            // the interval is multiplied by the x interval shift
            let x = this.linearinterpolate(this.t, this.T*this.xIntervalShift,this.H)
            this.drawCircle(x + this.x_b, y + this.y_b, this.r)

        }
}
MovingBallBoth.prototype.drawRect = drawRectangle;

function drawRectangle(x,y,w,h,fillC){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = fillC;
    ctx.fill();
}

/**
 * Block of moving balls
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillC fill colour
 * @param {number} T total tick interval (50 ticks = 1 second)
 * @param {number} H total Height covered by up/down motion
 **/

class BallGroup{
    constructor(x_b, y_b, H) {
        console.log("test")
        this.x_b = x_b;
        this.y_b = y_b;
        this.H = H;
        this.objectSet = []
        for(let i = 0 ; i< 100 ; i++){
            let T = 600 + 500*Math.random()
            let xIS = 0.5+Math.random();
            let r = 5 + 25*Math.random()
            let c = Math.floor(9*Math.random())
            let t = Math.floor(2*Math.random())
            let temp = new MovingBallBoth(x_b,y_b,r, colArray[t][c],T,H,xIS)
            this.objectSet.push(temp)
        }
    }
    update(){
        // draw back group rect
        ctx.save();
        drawRectangle(this.x_b, this.y_b, this.H, this.H, colArray[0][0]);
        ctx.clip();
        for(let i = 0; i< this.objectSet.length; i++){
            this.objectSet[i].update()
        }
        ctx.restore();

    }
}
