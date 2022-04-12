/**
 * INTERACTIVE BALL
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param (number} y ball centre y
 * @param {number} r radius of ball
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth width of outline
 */

class InteractiveObject{
    constructor(){
        // this listens for a mouse event - anywhere on the canvas
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        // variables to hold where the mouse was first clicked down
        this.xStart = 0
        this.yStart = 0
        // variables to hold the current mouse position
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mDown(e){
        console.log("Mouse down")
        // update positions (so this can be used in another object)
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
    }
    mUp(e){
        console.log("Mouse up")
        this.mouseIsDown = false;
    }
    mMove(e){
        // update positions so this can be used in another object
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        console.log("moving");
    }
    mLeave(e){
        // this might be a useful safety feature
        this.mouseIsDown = false;
        console.log("Mouse has left the canvas")
    }
}


class InteractiveBall extends InteractiveObject {
    // all the functions of interactive object are part of interactiveball
    constructor(x, y, r, fill, stroke, strokeWidth) {
        // super initialises the constructor of InteractiveObject
        super()
        this.x = x;
        this.y = y;
        this.r = r;
        this.fill = fill
        this.current_fill = fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }
    // we are now overriding the mouse down function in the original interactive object because we need to add to it
    mDown(e){
        // call the super function so the variables update
        super.mDown(e)
        // introduce a get boundary call
        // passing the x, y of the ball and the mouse position and the radius
        if(this.getBoundary(this.x,this.y,this.xMouse,this.yMouse,this.r)){
            // if the mouse goes down, and we are in the boundary
            // then we can say the ball is selected
            InteractiveBall.taken = this;
        }
    }
    update() {
        this.draw();
        // check if mouse is down and update x, y coordinates of the ball
        // to be the same as x, y mouse positions
        if (InteractiveBall.taken === this) {
            this.x = this.xMouse;
            this.y = this.yMouse;
            this.current_fill= "rgb(255,255,255)"
        }
        if(!this.mouseIsDown){
            InteractiveBall.taken = "";
            this.current_fill = this.fill
        }
    }
    // boundary check function
    getBoundary(x_c,y_c,x_m,y_m,r){
        let d = Math.sqrt(Math.pow(x_m-x_c,2)+Math.pow(y_m-y_c,2))
        return d < r;
    }
    draw() {
            this.drawCircle(this.x, this.y, this.r, this.current_fill, this.stroke, this.strokeWidth)
        }
        drawCircle(x, y, r, f, s, l) {
            ctx.beginPath()
            ctx.arc(x, y, r, 0, 2 * Math.PI)
            ctx.fillStyle = f
            ctx.strokeStyle = s
            ctx.lineWidth = l
            ctx.fill()
            ctx.stroke()
        }
}